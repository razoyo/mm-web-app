import { MmWebAppPage } from './app.po';

describe('mm-web-app App', function() {
  let page: MmWebAppPage;

  beforeEach(() => {
    page = new MmWebAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
