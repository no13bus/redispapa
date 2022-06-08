import { SocketAppPage } from './app.po';

describe('socket-app App', () => {
  let page: SocketAppPage;

  beforeEach(() => {
    page = new SocketAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
