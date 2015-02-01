//
//  ViewController.swift
//  Test
//
//  Created by Khilnani, Nikesh on 8/3/14.
//  Copyright (c) 2014 Khilnani, Nik. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var wLabel : UILabel!
    @IBOutlet var dLabel : UILabel!
    @IBOutlet var nButton : UIButton!
    @IBOutlet var dButton : UIButton!
        
    let words = WordModel()
                            
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let aSelector : Selector = "nextWord:"
        let tapGesture = UITapGestureRecognizer(target: self, action: aSelector)
        tapGesture.numberOfTapsRequired = 2
        view.addGestureRecognizer(tapGesture)
        
        let cSelector : Selector = "showDefn:"
        let upSwipe = UISwipeGestureRecognizer(target: self, action: cSelector)
        upSwipe.direction = UISwipeGestureRecognizerDirection.Up
        view.addGestureRecognizer(upSwipe)
                
        nextWord([])
        
        wLabel.alpha = 0.0
        UIView.animateWithDuration(2.0, animations: {
            self.wLabel.alpha = 1.0
            }, completion: {
                (value: Bool) in
                println(">>> wLabel Animation done.")
            })
        
        dLabel.alpha = 0.0
        UIView.animateWithDuration(2.0, animations: {
            self.dLabel.alpha = 1.0
            }, completion: {
                (value: Bool) in
                println(">>> dLabel Animation done.")
            })
        
        nButton.alpha = 0.0
        UIView.animateWithDuration(2.0, animations: {
            self.nButton.alpha = 1.0
            }, completion: {
                (value: Bool) in
                println(">>> nButton Animation done.")
            })
        
        dButton.alpha = 0.0
        UIView.animateWithDuration(2.0, animations: {
            self.dButton.alpha = 1.0
            }, completion: {
                (value: Bool) in
                println(">>> dButton Animation done.")
            })

    }
    
    @IBAction func nextWord (sender: AnyObject) {
        words.inc()
        var w:String = words.word
        NSLog("nextWord: " + w)
        wLabel.text = w
        dLabel.text = ""
    }
    
    @IBAction func showDefn (sender: AnyObject) {
        var d:String = words.defn
        NSLog("showDefn: " + d)
        dLabel.text = d

    }
    
    

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}

