async function command(): Promise<void> {
  console.log(`jira <command>

   command:
     - add
     - update
     - delete
     - checkout
     - fetch
     - help
     - current
     - (none)
`);
}

export default command;
