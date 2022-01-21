import { NormalizedResponseDTO, Report, UpdateReportRequestDTO } from '@kyso-io/kyso-model';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { RootState } from '..';
import { LOGGER } from '../..';
import { buildAuthHeaders } from '../../helpers/axios-helper';
import { printAuthenticated } from '../../helpers/logger-helper';
import httpClient from '../../services/http-client';
import { setError } from '../error/error-slice';
import { fetchRelationsAction } from '../relations/relations-actions';

export const createReportAction = createAsyncThunk('reports/createReport', async (paths: any[] = [], { getState, dispatch }): Promise<Report | null> => {
  try {
    LOGGER.trace(`createReportAction invoked`);
    const { auth, repos } = getState() as RootState;
    let reports;
    if (paths.length > 0) {
      reports = paths.map((path: any) => ({
        src: {
          provider: repos.provider,
          owner: repos.active!.owner,
          name: repos.active!.name,
          default_branch: repos.active!.default_branch,
          path,
        },
      }));
    } else {
      reports = {
        src: {
          provider: repos.provider,
          owner: repos.active!.owner,
          name: repos.active!.name,
          default_branch: repos.active!.default_branch,
        },
      };
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports`;
    LOGGER.silly(`createReportAction: ${printAuthenticated(auth)} - POST ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report>> = await httpClient.post(url, reports, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReportAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`createReportAction: axiosResponse ${axiosResponse.data.data}`);
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

export const fetchReportAction = createAsyncThunk('reports/fetchReport', async (reportId: string, { getState, dispatch }): Promise<Report | null> => {
  try {
    LOGGER.trace('fetchReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`;
    LOGGER.silly(`fetchReportAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReportAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data.data) {
      LOGGER.silly(`fetchReportAction: axiosResponse ${axiosResponse.data.data}`);
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchReportsAction = createAsyncThunk('reports/fetchReports', async (_, { getState, dispatch }): Promise<Report[]> => {
  try {
    LOGGER.silly('fetchReportsAction invoked');
    const { reports, auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports?page=${reports.page}&per_page=${reports.limit}&sort=desc`;
    LOGGER.silly(`fetchReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchReportsAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data.data) {
      LOGGER.silly(`fetchReportsAction: axiosResponse ${axiosResponse.data.data}`);
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

export const updateReportAction = createAsyncThunk('reports/updateReport', async (payload: { reportId: string; data: UpdateReportRequestDTO }, { getState, dispatch }): Promise<Report | null> => {
  try {
    LOGGER.silly('updateReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${payload.reportId}`;
    LOGGER.silly(`updateReportAction: ${printAuthenticated(auth)} - PATCH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report>> = await httpClient.patch(url, payload.data, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`updateReportAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`updateReportAction: axiosResponse ${axiosResponse.data.data}`);
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

export const pinReportAction = createAsyncThunk('reports/pinReport', async (reportId: string, { getState, dispatch }): Promise<Report | null> => {
  try {
    LOGGER.silly('pinReportAction invoked');
    const { auth } = getState() as RootState;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}/pin`;
    LOGGER.silly(`pinReportAction: ${printAuthenticated(auth)} - PATH ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report>> = await httpClient.patch(
      url,
      {},
      {
        headers: buildAuthHeaders(auth),
      }
    );
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`pinReportAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`pinReportAction: axiosResponse ${axiosResponse.data.data}`);
      return axiosResponse.data.data;
    } else {
      LOGGER.silly(`pinReportAction: Response didn't have data, returning null`);
      return null;
    }
  } catch (e: any) {
    LOGGER.error(`pinReportAction: Error processing action: ${e.toString()}`);
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
      LOGGER.silly(`fetchBranchesAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchBranchesAction: axiosResponse ${axiosResponse.data.data}`);
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
      LOGGER.silly(`fetchCommitsAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchCommitsAction: axiosResponse ${axiosResponse.data.data}`);
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
      LOGGER.silly(`fetchReposTreeAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchReposTreeAction: axiosResponse ${axiosResponse.data.data}`);
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
      LOGGER.silly(`deleteReportAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`deleteReportAction: axiosResponse ${axiosResponse.data.data}`);
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
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/pinned`;
    LOGGER.silly(`fetchUserPinnedReportsAction: ${printAuthenticated(auth)} - GET ${url}`);
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<Report[]>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchUserPinnedReportsAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchUserPinnedReportsAction: axiosResponse ${axiosResponse.data.data}`);
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
    const axiosResponse: AxiosResponse<NormalizedResponseDTO<any>> = await httpClient.get(url, {
      headers: buildAuthHeaders(auth),
    });
    if (axiosResponse?.data?.relations) {
      LOGGER.silly(`fetchFileContentAction: relations ${axiosResponse.data.relations}`);
      dispatch(fetchRelationsAction(axiosResponse.data.relations));
    }
    if (axiosResponse?.data?.data) {
      LOGGER.silly(`fetchFileContentAction: axiosResponse ${axiosResponse.data.data}`);
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
