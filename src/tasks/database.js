import child_process from 'child_process';
import fetch from 'node-fetch';
import util from 'util';
const exec = util.promisify(child_process.exec);

export const cypressReloadDBTask = async (baseUrl) => {
  await exec('make reload-database');
  await fetch(`${baseUrl}/dev/build`);
  return null;
}