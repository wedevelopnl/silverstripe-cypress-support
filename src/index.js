import inViewport from './assertions/inViewport';
import './commands/database';
import './commands/selectors';
import './commands/silverstripe';

before(() => {
  chai.use(inViewport);
});