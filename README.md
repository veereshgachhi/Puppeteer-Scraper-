Scrapes name and url of the products from any retail website given the css selectors and other details required as input
The input format and the required values are as follows:
 {
  base_url: 'https://www.hayneedle.com/furniture/recliners_list_187661?categoryID=187661&page=1',
  pagination_y_or_n: 'y',
  no_of_pages: '2',
  page_multiplying_factor: '1',
  no_of_elements_req: '100',
  css_img_urls: 'div.product-card__carousel___1CjvO img',
  css_name: 'h2.product-card-info__name___2YOvd.u-two-line',
  namedata_csv: 'heydata.csv'
}
