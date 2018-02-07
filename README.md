# Scraping

## Install

1. `git clone git@github.com:FiveTechnology/Scraping.git`
2. `cd Scraping`
3. `npm install`
4. See examples for either `cl.js` or `airbnb.js`

## Craig's List
Show a list of locations by state

    $ node clsites.js Minnesota
    About to pull https://www.craigslist.org/about/sites
    getURL: https://www.craigslist.org/about/sites
    Using cached version of https://www.craigslist.org/about/sites

             bemidji https://bemidji.craigslist.org/
            brainerd https://brainerd.craigslist.org/
              duluth https://duluth.craigslist.org/
             mankato https://mankato.craigslist.org/
         minneapolis https://minneapolis.craigslist.org/
                 rmn https://rmn.craigslist.org/
            marshall https://marshall.craigslist.org/
             stcloud https://stcloud.craigslist.org/

Pass in the location and right code

    $ node cl.js rockies sss
    0 = /usr/bin/node
    1 = /home/dustin/Scraping/cl
    2 = rockies
    3 = sss
    About to pull https://rockies.craigslist.org/search/sss?min_price=1000&max_price=11000
    getURL: https://rockies.craigslist.org/search/sss?min_price=1000&max_price=11000
    { pid: 6457896129,
      title: '98 Subaru Outback 151k 2.5 automatic',
      price: '$1000',
      location: 'rockies',
      category: 'sss',
      image: 'https://images.craigslist.org/00p0p_e8NG720vfXe_300x300.jpg',
      url: 'https://rockies.craigslist.org/cto/d/98-subaru-outback-151k-25/6457896129.html' }
    { pid: 6426346614,
      title: '2016 HaiBike Xduro All Mtn RX electric',
      price: '$2700',
      location: 'rockies',
      category: 'sss',
      image: 'https://images.craigslist.org/00f0f_52a7cvE7VDD_300x300.jpg',
      url: 'https://rockies.craigslist.org/bik/d/2016-haibike-xduro-all-mtn-rx/6426346614.html' }
    { pid: 6451946080,
      title: '1993 Toyota Landcruiser',
      price: '$8500',
      location: 'rockies',
      category: 'sss',
      image: 'https://images.craigslist.org/00l0l_6daqVfmvKit_300x300.jpg',
      url: 'https://rockies.craigslist.org/cto/d/1993-toyota-landcruiser/6451946080.html' }
    { pid: 6457869740,
      title: '2014 ski-doo summit x 800 - low miles',
      price: '$7000',
      location: 'rockies',
      category: 'sss',
      image: 'https://images.craigslist.org/00H0H_adX5kSaWYdj_300x300.jpg',
      url: 'https://rockies.craigslist.org/snw/d/2014-ski-doo-summit-800-low/6457869740.html' }

Using a search query 

    $ node cl.js minneapolis mcy 1 xs850
    0 = /usr/local/Cellar/node/7.3.0/bin/node
    1 = /Users/dustin/Projects/Scraping/cl.js
    2 = minneapolis
    3 = mcy
    4 = 1
    5 = xs850
    About to pull https://minneapolis.craigslist.org/search/mcy?query=xs850
    getURL: https://minneapolis.craigslist.org/search/mcy?query=xs850
    Saving https://minneapolis.craigslist.org/search/mcy?query=xs850 to 96a282831ee66e4c22a5cc0919c7c123
    { pid: 6460413329,
      title: '1980 Yamaha xs850',
      price: '$300',
      location: 'minneapolis',
      category: 'mcy',
      image: 'https://images.craigslist.org/01717_jIN9a6eP9Tv_300x300.jpg',
      url: 'https://minneapolis.craigslist.org/ank/mcy/d/1980-yamaha-xs850/6460413329.html' }
    
### Some Codes

| Code | Description         |
|------|---------------------|
| mcy  | Motorcycle Owner    |
| mca  | Motorcycle All      |
| mcd  | Motorcycle Dealer   |
| cto  | Cars/Trucks Owner   |

## Airbnb

Take a Airbnb # or VRBO and get some bed information.  May want to limit requests/second

    $ node airbnb.js 11240707
    11240707
    getURL: https://www.airbnb.com/rooms/11240707
    Bedroom 1
    1 queen bed
    Bedroom 2
    1 queen bed
    Common spaces
    1 sofa bed

## Hive Data Injection

This is example of how the Craig's List scraper sent information into a Hive plugin

```php
<?php
  namespace FiveTechnology\Plugins;
  class Post extends \FiveTechnology\Core\pb_item {

  function inject() {
    $this->load("pb_pid=" . $_POST['pid']);  
    $this->pid = $_POST['pid'];
    $this->title = $_POST['title'];
    $this->category = $_POST['category'];
    $this->price = $_POST['price'];
    $this->location = $_POST['location'];
    $this->url = $_POST['url'];
    $this->save();
    if ($_POST['image'] && ! $this->image->exists($_POST['image'])) {
      $this->image->addFile($_POST['image']);
    }
    $this->save();
  }
}
```      
      
