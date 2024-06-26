import child_process from 'child_process';
import fetch from 'node-fetch';
import util from 'util';
const exec = util.promisify(child_process.exec);

export const cypressReloadFixturesTask = async (fixtureUrl) => {
  await fetch(fixtureUrl);
}