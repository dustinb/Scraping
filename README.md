# Scraping

## Install

1. `git clone git@github.com:FiveTechnology/Scraping.git`
2. `cd Scraping`
3. `npm install`

## Craig's List

Category codes

    $ node clcats
    
Listing locations

    # Show all locations
    $ node clsites
    
    # By State
    $ node clsites -s Minnesota
    
    # Quiet only shows location
    $ node clsites -s Colorado -q
    
Doing search

    # -l Location -c Code -m Max Price -q Query
    $ node cl -l westslope -c mcy -m 500 -q yamaha
    [ { pid: 6563273862,
       title: '2001 Yamaha YZF-R6',
       price: '$400',
       location: undefined,
       category: undefined,
       image: 'https://images.craigslist.org/00Y0Y_8S6gzzhoqeG_300x300.jpg',
       url: 'https://westslope.craigslist.org/mcy/d/2001-yamaha-yzf-r6/6563273862.html' },
     { pid: 6544605701,
       title: '**2006 Midnight Warrior**',
       price: '$435',
       location: undefined,
       category: undefined,
       image: '',
       url: 'https://westslope.craigslist.org/mcy/d/2006-midnight-warrior/6544605701.html' },
     { pid: 6558477925,
       title: '1971 Yamaha RT-1 360 Dirt Bike',
       price: '$250',
       location: undefined,
       category: undefined,
       image: 'https://images.craigslist.org/00c0c_g0uaQBjLzch_300x300.jpg',
       url: 'https://westslope.craigslist.org/mcy/d/1971-yamaha-rtdirt-bike/6558477925.html' },
     { pid: 6554158693,
       title: 'Mobile motorcycle inspection for the novice buyer',
       price: '$1',
       location: undefined,
       category: undefined,
       image: '',
       url: 'https://rockies.craigslist.org/mcy/d/mobile-motorcycle-inspection/6554158693.html' },
     ...
       
Slack Bot

Slack command will be the following.  /craig will be whatever is setup in Slack pointed this server

    /craig sites [State]
    /craig cats
    /craig location|state code query
    /craig location|state code query min max
    /craig location|state code query max
     
    # Port to run
    $ node clbot -p 8080   
        
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
      
