//
//  Model.swift
//  Test
//
//  Created by Khilnani, Nikesh on 8/3/14.
//  Copyright (c) 2014 Khilnani, Nik. All rights reserved.
//

import Foundation

class WordModel {
    
    var words: [String] = []
    var defns: [String] = []
    var workingIndex:Int = 0
    var loaded:Bool = false
    
    var random: (String,String) {
        get {
            var index:Int = self.randomInt(0,max:words.count)
            return (
                words[ index ],
                defns[ index ]
            )
        }
    }
    
    var next: (String, String) {
        get {
            return (workingIndex < words.count) ? (
                words[ workingIndex ],
                defns[ workingIndex++ ]
            ) : ("","")
        }
    }
    
    var word: String {
        get {
            return (workingIndex < words.count) ? words[ workingIndex ] : ""
        }
    }

    var defn: String {
        get {
            return (workingIndex < defns.count) ? defns[ workingIndex ] : ""
        }
    }
    
    func inc() {
        if !loaded { load() }
        if ++workingIndex >= words.count {
            workingIndex = 0
        }
    }
    
    func randomInt(min: Int, max:Int) -> Int {
        return min + Int(arc4random_uniform(UInt32(max - min + 1)))
    }
    
    func load() {
        let jsonData = JSON.init(url:"http://behindthesite.com/data/test.json")
        NSLog("jsonData: " + jsonData.toString(pretty: true))
        
        for (i,v) in jsonData.generate() {
            words.append( v["word"].asString! )
            defns.append( v["defn"].asString! )
        }
        
        loaded = true
    }
    

}