import axios from 'axios';
import { Issue } from './model';
import { box } from './box';
import { JIRA_ENDPOINT, JIRA_AUTH, JIRA_PROJECT_KEY } from './env';
interface SearchResponse {
  expand: string;
  startAt: number;
  maxResults: number;
  total: number;
  issues: Issue[];
}

const client = axios.create({
  baseURL: JIRA_ENDPOINT,
  headers: {
    Authorization: `Basic ${Buffer.from(JIRA_AUTH).toString('base64')}`,
  },
});

export async function getIssues(): Promise<SearchResponse> {
  const body = {
    jql: `project = ${JIRA_PROJECT_KEY} AND
  assignee = currentUser() AND
  status != Done`,
    fields: ['summary', 'status', 'created', 'updated', 'reporter'],
  };

  const { data }: { data: SearchResponse } = await client.post('/rest/api/3/search', body);
  return data;
}

export async function getIssue(issueKey: string): Promise<Issue> {
  try {
    const { data } = await client.get(`/rest/api/3/issue/${issueKey}`);
    return data;
  } catch (e) {
    // TODO move to ./errors.ts
    if (e.isAxiosError && e.response.status === 404) {
      console.log(box(`can't find issue with key ${issueKey} 😔`));
      process.exit(0);
    } else {
      throw e;
    }
  }
}

export async function createIssue(): Promise<any> {
  // TODO
}

export async function updateIssue(): Promise<any> {
  // TODO
}

export async function deleteIssue(): Promise<any> {
  // TODO
}
