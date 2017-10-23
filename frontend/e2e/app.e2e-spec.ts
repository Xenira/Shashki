import { ShashkiPage } from './app.po';

describe('shashki App', () => {
  let page: ShashkiPage;

  beforeEach(() => {
    page = new ShashkiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
