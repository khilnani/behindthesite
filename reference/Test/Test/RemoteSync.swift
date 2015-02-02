//
//  RemoteSync.swift
//  Test
//
//  Created by Khilnani, Nikesh on 8/3/14.
//  Copyright (c) 2014 Khilnani, Nik. All rights reserved.
//

import Foundation

class RemoteSync: NSObject {
    
    var data = NSMutableData()
    
    func connect() {
        var url =  NSURL(string:"http://behindthesite.com/data/test.json")
        var request = NSURLRequest(URL: url!)
        var conn = NSURLConnection(request: request, delegate: self, startImmediately: true)
    }
    
    
    func connection(didReceiveResponse: NSURLConnection!, didReceiveResponse response: NSURLResponse!) {
        println("didReceiveResponse")
    }
    
    func connection(connection: NSURLConnection!, didReceiveData conData: NSData!) {
        self.data.appendData(conData)
    }
    
    func connectionDidFinishLoading(connection: NSURLConnection!) {
        
        var err: NSError

        var jsonResult: NSDictionary = NSJSONSerialization.JSONObjectWithData(data, options: NSJSONReadingOptions.MutableContainers, error: nil) as NSDictionary

        println( jsonResult["data"] )
    }
    
    
    deinit {
        println("deiniting")
    }
}
