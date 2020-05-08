const mysqlssh = require('mysql-ssh');
const fs = require('fs');

// node-mysql2 Query: https://github.com/sidorares/node-mysql2
// Query variables
const sprintName = 'Sprint 18-9 (AST)';
const taskStatus = 'open';
const taskFields = 'id, title, priority';
const taskHasPoints = 'IS NOT NULL';
const orderBy = (field) => { return `ORDER BY ${field}`; };

// Prepare SQL query statement
const sprintTasksSQLQueryStatement = (
    sprintName, 
    taskFields, 
    taskStatus,
    taskHasPoints = 'IS NOT NULL',
    orderBy = '') => {
    return `SELECT ${taskFields}
            FROM maniphest_task
            WHERE bitnami_phabricator_maniphest.maniphest_task.phid IN (
                SELECT dst FROM bitnami_phabricator_project.edge
                WHERE src=(
                    SELECT phid FROM bitnami_phabricator_project.project 
                    WHERE name='${sprintName}' LIMIT 1
                )
            )
            AND points ${taskHasPoints}
            AND status='${taskStatus}'
            ${orderBy};`
}

// Connect to Phabricator MySQL DB via SSH
mysqlssh.connect(
    {
        host: '35.158.119.120',
        port: 22,
        user: 'msuster',
        privateKey: fs.readFileSync(process.env.HOME + '/.ssh/id_rsa')
    },
    {
        host: '127.0.0.1',
        user: 'root',
        port: 3306,
        password: '0HGSRdg4L2AM',
        database: 'bitnami_phabricator_maniphest' // default DB
    }
)
.then(client => {
    client.query(
        sprintTasksSQLQueryStatement(
            sprintName,
            taskFields, 
            taskStatus,
            taskHasPoints,
            orderBy('ownerOrdering')),
        function (err, results, fields) {
            if (err) throw err;
            console.log(results[0]);
            mysqlssh.close();
        });
})
.catch(err => {
    console.log(err);
});