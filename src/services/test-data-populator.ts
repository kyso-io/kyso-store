import { store } from '../store'
import { Report } from '../types/report'
import { setReports } from '../store/reports/reports-slice'

const reports: Report[] = [{
  name: 'new report',
  type: 'report',
  views: 1,
  stars: 2,
  number_of_comments: 3,
  analytics: 'none yet',
  provider: 'none yet',
  source: 'none yet',
  pin: true,
  tags: ['report'],
  description: 'this is a report',
  request_private: false,
  user_id: 'none',
  comment_ids: ['none'],
  team_id: 'none',
}]

export const populate = async (store: any) => {
  const { getState, dispatch } = store
  
  await dispatch(setReports(reports))  
  console.log(getState().reports.list)
}

populate(store)