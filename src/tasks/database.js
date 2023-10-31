import child_process from 'child_process';
import fetch from 'node-fetch';
import util from 'util';
const exec = util.promisify(child_process.exec);

export const cypressReloadDBTask = async (baseUrl, useFetch = true) => {
  await exec('make reload-database');
  if (useFetch) {
    await fetch(`${baseUrl}/dev/build`);
  }
  else {
    await exec('make devbuild');
  }
  return null;
}