import { ReportDTO } from '@kyso-io/kyso-model';
import { store } from '../store';
import { setReports } from '../store/reports/reports-slice';

const reports: ReportDTO[] = [
  /*new Report('new report', 1, 2, 3, 'none yet', 'none yet', 'none yet', true, ['report'], 'this is a report', false, 'none',
['none'], 'none')*/
];

export const populate = async (store: any) => {
  const { getState, dispatch } = store;

  await dispatch(setReports(reports));
  // console.log(getState().reports.list);
};

populate(store);
