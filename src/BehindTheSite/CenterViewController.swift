//
//  CenterViewController.swift
//  BehindTheSite
//
//  Created by Nik Khilnani on 2/16/15.
//  Copyright (c) 2015 Nik Khilnani. All rights reserved.
//

import Foundation
import UIKit

@objc
protocol CenterViewControllerDelegate {
    optional func toggleNavigationPanel()
    optional func toggleSettingsPanel()
    optional func collapseSidePanels()
}

class CenterViewController : UIViewController {
    
    var delegate: CenterViewControllerDelegate?
        
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
    }
    
    // MARK: ContainerViewControllerDelegate
    
    func displayItem() {
        println("displayItem: CenterViewController")
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func navigationTapped(sender: AnyObject) {
        delegate?.toggleNavigationPanel?()
    }
    
    @IBAction func settingsTapped(sender: AnyObject) {
        delegate?.toggleSettingsPanel?()
    }
    
}