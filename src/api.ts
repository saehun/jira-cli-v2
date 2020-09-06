import axios from 'axios';
import { Issue } from './model';
interface SearchResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

const query = {
  jql: `project = ${JIRA_PROJECT_KEY} AND
assignee = currentUser() AND
status != Done`,
  fields: ['summary', 'status', 'created', 'updated'],
};

async function getIssues(): Promise<SearchResponse> {
  try {
    const { data }: { data: SearchResponse } = await axios.post(JIRA_API_ENDPOINT + '/search', query, {
      headers: {
        Authorization: `Basic ${Buffer.from(JIRA_AUTH).toString('base64')}`,
      },
    });

    return data;
  } catch (e) {
    console.log(e);
    if (e.isAxiosError) {
      //   TODO
      console.log('axios Error', e);
    }
  }
}
