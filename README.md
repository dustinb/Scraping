# Scraping

## Install

1. `git clone git@github.com:FiveTechnology/Scraping.git`
2. `npm install`
3. See examples for either `cl.js` or `airbnb.js`

## Craig's List

Pass in the location and right code

    $ node cl rockies sss
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
    { pid: 6450626560,
      title: '2016 Load Trail 24x8.5 Tilt Deckover trailer new',
      price: '$10500',
      location: 'rockies',
      category: 'sss',
      image: 'https://images.craigslist.org/00t0t_cRxjEmzL0v7_300x300.jpg',
      url: 'https://rockies.craigslist.org/tro/d/2016-load-trail-24x85-tilt/6450626560.html' }
    { pid: 6442617437,
      title: '2004 Volvo XC70',
      price: '$2600',
      location: 'rockies',
      category: 'sss',
      image: 'https://images.craigslist.org/00n0n_8HruTdwpTUi_300x300.jpg',
      url: 'https://rockies.craigslist.org/cto/d/2004-volvo-xc70/6442617437.html' }
    { pid: 6457790030,
      title: 'Honda Accord 1997',
      price: '$1750',
      location: 'rockies',
      category: 'sss',
      image: 'https://images.craigslist.org/00U0U_8xAd7mknJcN_300x300.jpg',
      url: 'https://rockies.craigslist.org/cto/d/honda-accord-1997/6457790030.html' }

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
      
