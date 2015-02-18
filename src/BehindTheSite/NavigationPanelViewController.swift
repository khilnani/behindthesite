//
//  NavigationPanelViewController.swift
//  BehindTheSite
//
//  Created by Nik Khilnani on 2/16/15.
//  Copyright (c) 2015 Nik Khilnani. All rights reserved.
//

import Foundation
import UIKit

class NavigationPanelViewController : UIViewController {
    
    var delegate: CenterViewController?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func refreshView(centerViewController: CenterViewController) {
        println("refreshView: NavigationPanelViewController")
        centerViewController.displayItem()
    }
    
}