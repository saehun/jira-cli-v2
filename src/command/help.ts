async function command(): Promise<void> {
  console.log(`jira <command>

   command:
     - add
     - update
     - delete
     - checkout
     - fetch
     - help
     - (none)
`);
}

export default command;
