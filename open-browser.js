const { exec } = require('child_process')

const platform = process.platform

let command

if (platform === 'win32') {
  command = 'start http://localhost:3000'
} else if (platform === 'darwin') {
  command = 'open http://localhost:3000'
} else if (platform === 'linux') {
  command = 'xdg-open http://localhost:3000'
}

exec(command, err => {
  if (err) {
    console.error(`Error opening browser: ${err}`)
  }
})
