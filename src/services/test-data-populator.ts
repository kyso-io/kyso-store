import { ReportDTO } from '@kyso-io/kyso-model';
import { store } from '../store';
import { setReports } from '../store/reports/reports-slice';

const reports: ReportDTO[] = [];

export const populate = async (store: any) => {
  const { dispatch } = store;

  await dispatch(setReports(reports));
};

populate(store);
