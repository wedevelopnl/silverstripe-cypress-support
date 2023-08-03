import child_process from 'child_process';
import fetch from 'node-fetch';
import util from 'util';
const exec = util.promisify(child_process.exec);

export const cypressReloadDBTask = async () => {
  await exec('make reload-database');
  await fetch(`${process.env.CYPRESS_BASE_URL}/dev/build`);
  return null;
}