import axios from 'axios';
import { Issue } from './model';
import { JIRA_ENDPOINT, JIRA_AUTH, JIRA_PROJECT_KEY } from './env';
interface SearchResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

const client = axios.create({
  url: JIRA_ENDPOINT,
  headers: {
    Authorization: `Basic ${Buffer.from(JIRA_AUTH).toString('base64')}`,
  },
});

const query = {
  jql: `project = ${JIRA_PROJECT_KEY} AND
assignee = currentUser() AND
status != Done`,
  fields: ['summary', 'status', 'created', 'updated', 'Sprint'],
};

export async function getIssues(): Promise<SearchResponse> {
  try {
    const { data }: { data: SearchResponse } = await client.post('/rest/api/3/search', query);

    console.log(JSON.stringify(data, undefined, 2));
    return data;
  } catch (e) {
    console.log(e);
    if (e.isAxiosError) {
      //   TODO
      console.log('axios Error', e);
    }
  }
}
