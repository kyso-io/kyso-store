import { CreateReportDTO, GithubFileHash, NormalizedResponseDTO, Report, ReportDTO, UpdateReportRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AdmZip from 'adm-zip';
import { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { createReadStream, readFileSync, statSync, unlinkSync } from 'fs';
import sha256File from 'sha256-file';
import { RootState } from '..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';

export const createReportAction = createAsyncThunk('reports/createReport', async (createReportDto: CreateReportDTO, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    // console.log(`createReportAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports`;
    // console.log(`createReportAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, createReportDto, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`createReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`createReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`createReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchReportAction = createAsyncThunk('reports/fetchReport', async (reportId: string, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    // console.log('fetchReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`;
    // console.log(`fetchReportAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data.data) {
      // console.log(`fetchReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchReportsAction = createAsyncThunk('reports/fetchReports', async (payload: { filter?: object; page?: number; per_page?: number }, { getState, dispatch }): Promise<ReportDTO[]> => {
  try {
    // console.log('fetchReportsAction invoked');
    const { auth } = getState() as RootState;

    const qs = new URLSearchParams({
      page: (payload?.page || 1).toString(),
      per_page: (payload?.per_page || 20).toString(),
      sort: 'desc',
      ...payload?.filter,
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports?${qs.toString()}`;
    // console.log(`fetchReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchReportsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data.data) {
      // console.log(`fetchReportsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchReportsAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchReportsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const updateReportAction = createAsyncThunk('reports/updateReport', async (payload: { reportId: string; data: UpdateReportRequestDTO }, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    // console.log('updateReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}`;
    // console.log(`updateReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(url, payload.data, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`updateReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`updateReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`updateReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`updateReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchBranchesAction = createAsyncThunk('reports/fetchBranches', async (reportId: string, { getState, dispatch }): Promise<any[]> => {
  try {
    // console.log('fetchBranchesAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/branches`;
    // console.log(`fetchBranchesAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchBranchesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchBranchesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchBranchesAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchBranchesAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchCommitsAction = createAsyncThunk('reports/fetchCommits', async (payload: { reportId: string; branch: string }, { getState, dispatch }): Promise<any[]> => {
  try {
    // console.log('fetchCommitsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}/${payload.branch}/commits`;
    // console.log(`fetchCommitsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchCommitsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchCommitsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchCommitsAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchCommitsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchReportsTreeAction = createAsyncThunk(
  'reports/fetchReportsTree',
  async (payload: { reportId: string; branch: string; filePath: string }, { getState, dispatch }): Promise<GithubFileHash[]> => {
    try {
      // console.log('fetchReportsTreeAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}/${payload.branch}/tree?path=${payload.filePath}`;
      // console.log(`fetchReportsTreeAction: ${printAuthenticated(auth)} - GET ${url}`);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<GithubFileHash[]>> = await httpClient.get(url, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchReportsTreeAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`fetchReportsTreeAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`fetchReportsTreeAction: Response didn't have data, returning null`);
        return [];
      }
    } catch (e: any) {
      // console.log(`fetchReportsTreeAction: Error processing action: ${e.toString()}`);
      return [];
    }
  }
);

export const deleteReportAction = createAsyncThunk('reports/deleteReport', async (reportId: string, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    // console.log('deleteReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`;
    // console.log(`deleteReportAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchUserPinnedReportsAction = createAsyncThunk('reports/fetchUserPinnedReports', async (userId: string, { getState, dispatch }): Promise<Report[]> => {
  try {
    // console.log('fetchUserPinnedReportsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pinned`;
    // console.log(`fetchUserPinnedReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchUserPinnedReportsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`fetchUserPinnedReportsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`fetchUserPinnedReportsAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    // console.log(`fetchUserPinnedReportsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchFileContentAction = createAsyncThunk('reports/fetchFileContent', async (payload: { reportId: string; hash: string }, { getState, dispatch }): Promise<Buffer | null> => {
  try {
    // console.log('fetchFileContentAction invoked');
    const { auth } = getState() as RootState;
    const hash = payload.hash;

    // what is this, I have no idea?
    // if (reports.tree) {
    //   hash = reports.tree[0].hash;
    // }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}/file/${hash}`;
    // console.log(`fetchFileContentAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<Buffer> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data) {
      // console.log(`fetchFileContentAction: axiosResponse ${JSON.stringify(axiosResponse.data)}`);
      return axiosResponse.data;
    } else {
      // console.log(`fetchFileContentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`fetchFileContentAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const toggleUserPinReportAction = createAsyncThunk('reports/toggleUserPinReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    // console.log('toggleUserPinReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/user-pin`;
    // console.log(`toggleUserPinReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`toggleUserPinReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`toggleUserPinReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`toggleUserPinReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`toggleUserPinReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const toggleGlobalPinReportAction = createAsyncThunk('reports/toggleGlobalPinReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    // console.log('toggleGlobalPinReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/pin`;
    // console.log(`toggleGlobalPinReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`toggleGlobalPinReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`toggleGlobalPinReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`toggleGlobalPinReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`toggleGlobalPinReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const toggleUserStarReportAction = createAsyncThunk('reports/toggleUserStarReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    // console.log('toggleUserStarReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/user-star`;
    // console.log(`toggleUserStarReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`toggleUserStarReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`toggleUserStarReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`toggleUserStarReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`toggleUserStarReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const createKysoReportAction = createAsyncThunk(
  'reports/createKysoReportAction',
  async (
    payload: { title: string; organization: string; team: string; description: string; tags: string[]; filePaths: string[]; basePath: string | null },
    { getState, dispatch }
  ): Promise<ReportDTO | null> => {
    const zipedFiles: string[] = [];
    try {
      // console.log(`createKysoReportAction invoked`);
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/kyso`;
      // console.log(`createKysoReportAction: ${printAuthenticated(auth)} - POST ${url}`);

      const formData: FormData = new FormData();
      formData.append('title', payload.title);
      formData.append('description', payload.description);
      formData.append('organization', payload.organization);
      formData.append('team', payload.team);
      payload.tags.forEach((tag: string) => {
        formData.append('tags', tag);
      });

      for (const file of payload.filePaths) {
        const zip = new AdmZip();
        const sha: string = sha256File(file);
        const content: Buffer = readFileSync(file);
        const filename = payload?.basePath && payload.basePath.length > 0 ? file.replace(payload.basePath + '/', '') : file;
        zip.addFile(filename, content);
        const outputFilePath = `/tmp/${filename}.zip`;
        zip.writeZip(outputFilePath);
        zipedFiles.push(outputFilePath);
        formData.append('files', createReadStream(outputFilePath), {
          filename,
          knownLength: statSync(outputFilePath).size,
        });
        formData.append('original_shas', sha);
        formData.append('original_sizes', statSync(file).size.toString());
        formData.append('original_names', filename);
      }

      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, formData, {
        headers: {
          ...buildAuthHeaders(auth),
          ...formData.getHeaders(),
          'content-length': formData.getLengthSync(),
        },
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`createKysoReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`createKysoReportAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`createKysoReportAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    } finally {
      // Delete zip files
      for (const zipedFile of zipedFiles) {
        unlinkSync(zipedFile);
      }
    }
  }
);

export const createKysoReportUIAction = createAsyncThunk(
  'reports/createKysoReportUI',
  async (
    payload: { title: string; organization: string; team: string; description: string; tags: string[]; files: File[]; basePath: string | null },
    { getState, dispatch }
  ): Promise<ReportDTO | null> => {
    try {
      // console.log(`createKysoReportUIAction invoked`);
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/ui`;
      // console.log(`createKysoReportUIAction: ${printAuthenticated(auth)} - POST ${url}`);
      const formData: FormData = new FormData();
      formData.append('title', payload.title);
      formData.append('description', payload.description);
      formData.append('organization', payload.organization);
      formData.append('team', payload.team);
      payload.tags.forEach((tag: string) => {
        formData.append('tags', tag);
      });
      payload.files.forEach((file: File) => {
        formData.append('files', file);
      });
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, formData, {
        headers: {
          ...buildAuthHeaders(auth),
          headers: { 'content-type': 'multipart/form-data' },
        },
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`createKysoReportUIAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`createKysoReportUIAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(e);
      // console.log(`createKysoReportUIAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

export const importGithubRepositoryAction = createAsyncThunk('reports/importGithubRepository', async (repositoryName: string, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    // console.log(`importGithubRepositoryAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/github/${repositoryName}`;
    // console.log(`importGithubRepositoryAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      // console.log(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`importGithubRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`importGithubRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`importGithubRepositoryAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const pullReportAction = createAsyncThunk('reports/pullReport', async (payload: { reportName: string; teamName: string }, { getState, dispatch }): Promise<Buffer | null> => {
  try {
    // console.log(`pullReportAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportName}/${payload.teamName}/pull`;
    // console.log(`pullReportAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<Buffer> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
      responseType: 'arraybuffer',
    });
    return axiosResponse.data;
  } catch (e: any) {
    // console.log(`pullReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const updateReportPreviewPictureAction = createAsyncThunk(
  'user/updateOrganizationProfilePicture',
  async (args: { reportId: string; file: File }, { dispatch, getState }): Promise<ReportDTO | null> => {
    try {
      // console.log('updateReportPreviewPictureAction invoked');
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${args.reportId}/preview-picture`;
      // console.log(`updateReportPreviewPictureAction: ${printAuthenticated(auth)} - POST ${url}`);
      const formData = new FormData();
      formData.append('file', args.file);
      const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, formData, {
        headers: buildAuthHeaders(auth),
      });
      if (axiosResponse?.data?.relations) {
        // console.log(`updateReportPreviewPictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        // console.log(`updateReportPreviewPictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        // console.log(`updateReportPreviewPictureAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      // console.log(`updateReportPreviewPictureAction: Error processing action: ${e.toString()}`);
      dispatch(setError(e.toString()));
      return null;
    }
  }
);

export const deleteReportPreviewPictureAction = createAsyncThunk('user/deleteReportPreviewPicture', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    // console.log('deleteReportPreviewPictureAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/preview-picture`;
    // console.log(`deleteReportPreviewPictureAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      // console.log(`deleteReportPreviewPictureAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      // console.log(`deleteReportPreviewPictureAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      // console.log(`deleteReportPreviewPictureAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    // console.log(`deleteReportPreviewPictureAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
