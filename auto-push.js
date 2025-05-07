const chokidar = require('chokidar');
const simpleGit = require('simple-git');
const git = simpleGit();

const watcher = chokidar.watch('.', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

watcher.on('all', async (event, path) => {
  try {
    console.log(`Detected change: ${event} on ${path}`);
    await git.add('.');
    await git.commit('Auto-commit on file change');
    await git.push('origin', 'master'); // change to 'master' if that's your branch
    console.log('Changes pushed to GitHub.');
  } catch (err) {
    console.error('Git error:', err.message);
  }
});
