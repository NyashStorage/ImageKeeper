import { HttpStatus } from '@nestjs/common';
import { v4 as randomUUID } from 'uuid';
import { app, httpClient } from '../jest.setup';
import { makeAuthorizedRequest } from '../utils/helpers/request.helpers';
import { TokensService } from '../../src/tokens/tokens.service';
import { DaniilUser, VikaUser } from '../fixtures/users';
import { FindFileResponse } from '../../src/files/dao/responses/find-file.response';
import { ListFileResponse } from '../../src/files/dao/responses/list-file.response';
import { DEFAULT_LIMIT, DEFAULT_SKIP } from '../../src/files/files.service';

describe('Files Integration', () => {
  let tokensService: TokensService;

  beforeAll(() => {
    tokensService = app.get<TokensService>(TokensService);
  });

  describe('[POST] /api/files/single', () => {
    it('should upload file', async () => {
      const { body } = await makeAuthorizedRequest(
        uploadFiles(['./test/fixtures/files/100.png']),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.CREATED);

      expect(body.ownerId).toEqual(DaniilUser.id);
      expect(body.url).toMatch(new RegExp(`https:\/\/.+/${body.key}`));
    });

    it('should return an error when no file is specified', async () => {
      const { body: error } = await makeAuthorizedRequest(
        uploadFiles(),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.BAD_REQUEST);

      expect(error.message).toEqual('File not specified.');
    });

    it('should return an error without authorization', async () => {
      const { body: error } = await makeAuthorizedRequest(
        uploadFiles(),
        tokensService,
        { token: 'invalid token' },
      ).expect(HttpStatus.UNAUTHORIZED);

      expect(error.message).toEqual('Access token invalid.');
    });
  });

  describe('[POST] /api/files/multiple', () => {
    it('should upload files', async () => {
      const { body } = await makeAuthorizedRequest(
        uploadFiles([
          './test/fixtures/files/100.png',
          './test/fixtures/files/150.png',
        ]),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.CREATED);

      for (let file of body) {
        expect(file.ownerId).toEqual(DaniilUser.id);
        expect(file.url).toMatch(new RegExp(`https:\/\/.+/${file.key}`));
      }
    });

    it('should return an error when no files is specified', async () => {
      const { body: error } = await makeAuthorizedRequest(
        uploadFiles([], true),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.BAD_REQUEST);

      expect(error.message).toEqual('File not specified.');
    });

    it('should return an error without authorization', async () => {
      const { body: error } = await makeAuthorizedRequest(
        uploadFiles(),
        tokensService,
        { token: 'invalid token' },
      ).expect(HttpStatus.UNAUTHORIZED);

      expect(error.message).toEqual('Access token invalid.');
    });
  });

  describe('[GET] /api/files', () => {
    let files: FindFileResponse[];

    beforeEach(async () => {
      // Methods work accurately according to tests above.
      const { body: daniilFiles } = await makeAuthorizedRequest(
        uploadFiles(
          Array(DEFAULT_LIMIT * 2).fill('./test/fixtures/files/100.png'),
        ),
        tokensService,
        { user: DaniilUser },
      );

      const { body: vikaFiles } = await makeAuthorizedRequest(
        uploadFiles(
          Array(DEFAULT_LIMIT * 2).fill('./test/fixtures/files/100.png'),
        ),
        tokensService,
        { user: VikaUser },
      );

      files = [...daniilFiles, ...vikaFiles];
    });

    it('should get files without arguments', async () => {
      const { body } = await listFiles().expect(HttpStatus.OK);
      validateListResponse(
        body,
        files,
        DEFAULT_SKIP,
        DEFAULT_LIMIT,
        DaniilUser.id,
      );
    });

    it('should get only 5 files', async () => {
      const { body } = await listFiles(undefined, 5).expect(HttpStatus.OK);
      validateListResponse(body, files, DEFAULT_SKIP, 5, DaniilUser.id);
    });

    it('should skip 10 files', async () => {
      const { body } = await listFiles(2).expect(HttpStatus.OK);
      validateListResponse(
        body,
        files,
        DEFAULT_LIMIT,
        DEFAULT_LIMIT,
        DaniilUser.id,
      );
    });

    it('should get 5 files by skipping 20 files', async () => {
      const { body } = await listFiles(5, 5).expect(HttpStatus.OK);
      validateListResponse(body, files, 20, 5, VikaUser.id);
    });
  });

  describe(`[GET] /api/files/owned`, () => {
    let userFiles: { [key: string]: FindFileResponse[] };

    beforeEach(async () => {
      // Methods work accurately according to tests above.
      const { body: daniilFiles } = await makeAuthorizedRequest(
        uploadFiles(
          Array(DEFAULT_LIMIT * 2).fill('./test/fixtures/files/100.png'),
        ),
        tokensService,
        { user: DaniilUser },
      );

      const { body: vikaFiles } = await makeAuthorizedRequest(
        uploadFiles(
          Array(DEFAULT_LIMIT * 2).fill('./test/fixtures/files/100.png'),
        ),
        tokensService,
        { user: VikaUser },
      );

      userFiles = {
        [DaniilUser.id]: daniilFiles,
        [VikaUser.id]: vikaFiles,
      };
    });

    it('should get files without arguments', async () => {
      const { body } = await makeAuthorizedRequest(
        listFiles(undefined, undefined, true),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.OK);

      validateListResponse(
        body,
        userFiles[DaniilUser.id],
        DEFAULT_SKIP,
        DEFAULT_LIMIT,
        DaniilUser.id,
      );
    });

    it('should get only 5 files', async () => {
      const { body } = await makeAuthorizedRequest(
        listFiles(undefined, 5, true),
        tokensService,
        { user: VikaUser },
      ).expect(HttpStatus.OK);

      validateListResponse(
        body,
        userFiles[VikaUser.id],
        DEFAULT_SKIP,
        5,
        VikaUser.id,
      );
    });

    it('should skip 10 files', async () => {
      const { body } = await makeAuthorizedRequest(
        listFiles(2, undefined, true),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.OK);

      validateListResponse(
        body,
        userFiles[DaniilUser.id],
        DEFAULT_LIMIT,
        DEFAULT_LIMIT,
        DaniilUser.id,
      );
    });

    it('should get 5 files by skipping 10 files', async () => {
      const { body } = await makeAuthorizedRequest(
        listFiles(3, 5, true),
        tokensService,
        { user: VikaUser },
      ).expect(HttpStatus.OK);

      validateListResponse(body, userFiles[VikaUser.id], 10, 5, VikaUser.id);
    });

    it('should return an error without authorization', async () => {
      const { body: error } = await makeAuthorizedRequest(
        listFiles(undefined, undefined, true),
        tokensService,
        { token: 'invalid token' },
      ).expect(HttpStatus.UNAUTHORIZED);

      expect(error.message).toEqual('Access token invalid.');
    });
  });

  describe('[PUT] /api/files/:id', () => {
    let files: FindFileResponse[];

    beforeEach(async () => {
      // Methods work accurately according to tests above.
      const { body: photo1 } = await makeAuthorizedRequest(
        uploadFiles(['./test/fixtures/files/100.png']),
        tokensService,
        { user: DaniilUser },
      );

      const { body: photo2 } = await makeAuthorizedRequest(
        uploadFiles(['./test/fixtures/files/100.png']),
        tokensService,
        { user: VikaUser },
      );

      files = [photo1, photo2];
    });

    it('should update file title', async () => {
      const title = randomUUID();

      const { body } = await makeAuthorizedRequest(
        updateFile(files[0].key, title),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.OK);

      expect(body.title).toEqual(title);
      expect(body.ownerId).toEqual(DaniilUser.id);
      expect(body.url).toMatch(new RegExp(`https:\/\/.+/${body.key}`));
    });

    it('should return an error without authorization', async () => {
      const { body: error } = await makeAuthorizedRequest(
        updateFile(files[0].key, randomUUID()),
        tokensService,
        { token: 'invalid token' },
      ).expect(HttpStatus.UNAUTHORIZED);

      expect(error.message).toEqual('Access token invalid.');
    });

    it('should return an error when no title is specified', async () => {
      const { body: error } = await makeAuthorizedRequest(
        updateFile(files[0].key),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.BAD_REQUEST);

      expect(error.message).toEqual([
        'title must be shorter than or equal to 100 characters',
      ]);
    });

    it('should return an error when trying to update a non-existent file', async () => {
      const { body: error } = await makeAuthorizedRequest(
        updateFile('invalid_id', randomUUID()),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.NOT_FOUND);

      expect(error.message).toEqual(
        `File with identifier "invalid_id" was not found or you are not its owner.`,
      );
    });

    it('should return an error when trying to update a file you do not own', async () => {
      const { body: error } = await makeAuthorizedRequest(
        updateFile(files[1].key, randomUUID()),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.NOT_FOUND);

      expect(error.message).toEqual(
        `File with identifier "${files[1].key}" was not found or you are not its owner.`,
      );
    });
  });

  describe('[DELETE] /api/files/:id', () => {
    let files: FindFileResponse[];

    beforeEach(async () => {
      // Methods work accurately according to tests above.
      const { body: photo1 } = await makeAuthorizedRequest(
        uploadFiles(['./test/fixtures/files/100.png']),
        tokensService,
        { user: DaniilUser },
      );

      const { body: photo2 } = await makeAuthorizedRequest(
        uploadFiles(['./test/fixtures/files/100.png']),
        tokensService,
        { user: VikaUser },
      );

      files = [photo1, photo2];
    });

    it('should return an error when trying to delete a non-existent file', async () => {
      const { body: error } = await makeAuthorizedRequest(
        deleteFile('invalid_id'),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.NOT_FOUND);

      expect(error.message).toEqual(
        `File with identifier "invalid_id" was not found or you are not its owner.`,
      );
    });

    it('should delete file', async () => {
      const targetFile = files[0];

      const { body } = await makeAuthorizedRequest(
        deleteFile(targetFile.key),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.OK);

      expect(body.ownerId).toEqual(DaniilUser.id);
      expect(body.url).toMatch(new RegExp(`https:\/\/.+/${body.key}`));

      const { body: error } = await makeAuthorizedRequest(
        deleteFile(targetFile.key),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.NOT_FOUND);

      expect(error.message).toEqual(
        `File with identifier "${targetFile.key}" was not found or you are not its owner.`,
      );
    });

    it('should return an error without authorization', async () => {
      const { body: error } = await makeAuthorizedRequest(
        deleteFile(files[0].key),
        tokensService,
        { token: 'invalid token' },
      ).expect(HttpStatus.UNAUTHORIZED);

      expect(error.message).toEqual('Access token invalid.');
    });

    it('should return an error when trying to delete a file you do not own', async () => {
      const { body: error } = await makeAuthorizedRequest(
        deleteFile(files[1].key),
        tokensService,
        { user: DaniilUser },
      ).expect(HttpStatus.NOT_FOUND);

      expect(error.message).toEqual(
        `File with identifier "${files[1].key}" was not found or you are not its owner.`,
      );
    });
  });
});

const uploadFiles = (
  files: string[] = [],
  isMultiple: boolean = files.length > 1,
) => {
  const request = httpClient.post(
    `/files/${isMultiple ? 'multiple' : 'single'}`,
  );

  for (let file of files) request.attach(`image${isMultiple ? 's' : ''}`, file);

  return request;
};

const updateFile = (id: string, title?: string) =>
  httpClient.put(`/files/${id}`).send(title ? { title } : undefined);

const deleteFile = (id: string) => httpClient.delete(`/files/${id}`);

const listFiles = (page?: number, limit?: number, owned?: boolean) => {
  const query = {};

  if (page !== undefined) query['page'] = page + '';
  if (limit !== undefined) query['limit'] = limit + '';

  const queryParams = new URLSearchParams(query).toString();

  return httpClient.get(`/files${owned ? '/owned' : ''}?${queryParams}`);
};

const validateListResponse = (
  body: ListFileResponse,
  files: FindFileResponse[],
  skip: number,
  limit: number,
  ownerId: string,
) => {
  expect(body.currentItems).toEqual(skip + body.files.length);
  expect(body.totalItems).toEqual(files.length);

  expect(body.currentPage).toEqual(
    Math.min(Math.ceil(skip / limit) + 1, Math.ceil(files.length / limit)),
  );
  expect(body.totalPages).toEqual(Math.ceil(files.length / limit));

  for (let file of body.files) {
    expect(file.ownerId).toEqual(ownerId);
    expect(file.url).toMatch(new RegExp(`https:\/\/.+/${file.key}`));
  }
};
