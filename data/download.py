#!/usr/bin/env python

import urllib

urls = {
    'products': 'http://api.behindthesite.com/v1/products',
    'used': 'http://api.behindthesite.com/v1/products/used',
    'stacks': 'http://api.behindthesite.com/v1/stacks',
    'taxonomy': 'http://api.behindthesite.com/v1/taxonomy'
  }

for name, link in urls.iteritems():
  print 'Downloading {1} to {0}'.format(name, link)
  u = urllib.urlopen( link ) 
  data = u.read()
  u.close()
  
  f = open(name + '.json', 'w')
  f.write(data)
  f.close()
