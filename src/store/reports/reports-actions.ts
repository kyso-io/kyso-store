import { CreateReportDTO, NormalizedResponseDTO, Report, ReportDTO, UpdateReportRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AdmZip from 'adm-zip';
import { AxiosResponse } from 'axios';
import FormData from 'form-data';
import { createReadStream, readFileSync, statSync, unlinkSync } from 'fs';
import sha256File from 'sha256-file';
import { RootState } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';

export const createReportAction = createAsyncThunk('reports/createReport', async (createReportDto: CreateReportDTO, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    LOGGER.trace(`createReportAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports`;
    LOGGER.silly(`createReportAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(url, createReportDto, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`createReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`createReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchReportAction = createAsyncThunk('reports/fetchReport', async (reportId: string, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    LOGGER.trace('fetchReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`;
    LOGGER.silly(`fetchReportAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data.data) {
      LOGGER.silly(`fetchReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchReportsAction = createAsyncThunk('reports/fetchReports', async (payload: { filter?: object; page?: number; per_page?: number }, { getState, dispatch }): Promise<ReportDTO[]> => {
  try {
    LOGGER.silly('fetchReportsAction invoked');
    const { auth } = getState() as RootState;

    const qs = new URLSearchParams({
      page: (payload?.page || 1).toString(),
      per_page: (payload?.per_page || 20).toString(),
      sort: 'desc',
      ...payload?.filter,
    });

    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports?${qs.toString()}`;
    LOGGER.silly(`fetchReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReportsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data.data) {
      LOGGER.silly(`fetchReportsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchReportsAction: Response didn't have data, returning null`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchReportsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const updateReportAction = createAsyncThunk('reports/updateReport', async (payload: { reportId: string; data: UpdateReportRequestDTO }, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    LOGGER.silly('updateReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}`;
    LOGGER.silly(`updateReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(url, payload.data, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`updateReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`updateReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`updateReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`updateReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchBranchesAction = createAsyncThunk('reports/fetchBranches', async (reportId: string, { getState, dispatch }): Promise<any[]> => {
  try {
    LOGGER.silly('fetchBranchesAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/branches`;
    LOGGER.silly(`fetchBranchesAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchBranchesAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchBranchesAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchBranchesAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchBranchesAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchCommitsAction = createAsyncThunk('reports/fetchCommits', async (payload: { reportId: string; branch: string }, { getState, dispatch }): Promise<any[]> => {
  try {
    LOGGER.silly('fetchCommitsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}/${payload.branch}/commits`;
    LOGGER.silly(`fetchCommitsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchCommitsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchCommitsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchCommitsAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchCommitsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchReposTreeAction = createAsyncThunk('reports/fetchTree', async (payload: { reportId: string; branch: string; filePath: string }, { getState, dispatch }): Promise<string | null> => {
  try {
    LOGGER.silly('fetchReposTreeAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}/${payload.branch}/tree/${payload.filePath}`;
    LOGGER.silly(`fetchReposTreeAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<string>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReposTreeAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchReposTreeAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchReposTreeAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchReposTreeAction: Error processing action: ${e.toString()}`);
    return null;
  }
});

export const deleteReportAction = createAsyncThunk('reports/deleteReport', async (reportId: string, { getState, dispatch }): Promise<Report | null> => {
  try {
    LOGGER.silly('deleteReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`;
    LOGGER.silly(`deleteReportAction: ${printAuthenticated(auth)} - DELETE ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report>> = await httpClient.delete(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`deleteReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`deleteReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`deleteReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const fetchUserPinnedReportsAction = createAsyncThunk('reports/fetchUserPinnedReports', async (userId: string, { getState, dispatch }): Promise<Report[]> => {
  try {
    LOGGER.silly('fetchUserPinnedReportsAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pinned`;
    LOGGER.silly(`fetchUserPinnedReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchUserPinnedReportsAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchUserPinnedReportsAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`fetchUserPinnedReportsAction: Response didn't have data, returning []`);
      return [];
    }
  } catch (e: any) {
    LOGGER.error(`fetchUserPinnedReportsAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return [];
  }
});

export const fetchFileContentAction = createAsyncThunk('reports/fetchFileContent', async (payload: { reportId: string; hash: string }, { getState, dispatch }): Promise<any> => {
  try {
    LOGGER.silly('fetchFileContentAction invoked');
    const { auth, reports } = getState() as RootState;
    let hash = payload.hash;
    if (reports.tree) {
      hash = reports.tree[0].hash;
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}/file/${hash}`;
    LOGGER.silly(`fetchFileContentAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchFileContentAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchFileContentAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data;
    } else {
      LOGGER.silly(`fetchFileContentAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`fetchFileContentAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const toggleUserPinReportAction = createAsyncThunk('reports/toggleUserPinReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    LOGGER.silly('toggleUserPinReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/user-pin`;
    LOGGER.silly(`fetchFileContentAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`toggleUserPinReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`toggleUserPinReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`toggleUserPinReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`toggleUserPinReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const toggleUserStarReportAction = createAsyncThunk('reports/toggleUserStarReport', async (reportId: string, { dispatch, getState }): Promise<ReportDTO | null> => {
  try {
    LOGGER.silly('toggleUserStarReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/user-star`;
    LOGGER.silly(`fetchFileContentAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`toggleUserStarReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`toggleUserStarReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`toggleUserStarReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`toggleUserStarReportAction: Error processing action: ${e.toString()}`);
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
      LOGGER.trace(`createKysoReportAction invoked`);
      const { auth } = getState() as RootState;
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/kyso`;
      LOGGER.silly(`createKysoReportAction: ${printAuthenticated(auth)} - POST ${url}`);

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
        LOGGER.silly(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
        dispatch(fetchRelationsAction(axiosResponse.data.relations));
      }
      if (axiosResponse?.data?.data) {
        LOGGER.silly(`createKysoReportAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
        return axiosResponse.data.data;
      } else {
        LOGGER.silly(`createKysoReportAction: Response didn't have data, returning null`);
        return null;
      }
    } catch (e: any) {
      LOGGER.error(`createKysoReportAction: Error processing action: ${e.toString()}`);
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

export const importGithubRepositoryAction = createAsyncThunk('reports/importGithubRepository', async (repositoryName: string, { getState, dispatch }): Promise<ReportDTO | null> => {
  try {
    LOGGER.trace(`importGithubRepositoryAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/github/${repositoryName}`;
    LOGGER.silly(`importGithubRepositoryAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<ReportDTO>> = await httpClient.post(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReportAction: relations ${JSON.stringify(axiosResponse.data.relations)}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`importGithubRepositoryAction: axiosResponse ${JSON.stringify(axiosResponse.data.data)}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`importGithubRepositoryAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`importGithubRepositoryAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});

export const pullReportAction = createAsyncThunk('reports/pullReport', async (payload: { reportName: string; teamName: string }, { getState, dispatch }): Promise<Buffer | null> => {
  try {
    LOGGER.trace(`pullReportAction invoked`);
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportName}/${payload.teamName}/pull`;
    LOGGER.silly(`pullReportAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<Buffer> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
      responseType: 'arraybuffer',
    });
    return axiosResponse.data;
  } catch (e: any) {
    LOGGER.error(`pullReportAction: Error processing action: ${e.toString()}`);
    dispatch(setError(e.toString()));
    return null;
  }
});
