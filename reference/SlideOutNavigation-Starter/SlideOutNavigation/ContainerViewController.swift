//
//  ContainerViewController.swift
//  SlideOutNavigation
//
//  Created by James Frost on 03/08/2014.
//  Copyright (c) 2014 James Frost. All rights reserved.
//

import UIKit
import QuartzCore

class ContainerViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
    }
  
    // MARK: CenterViewController delegate methods
  
    func toggleLeftPanel() {
    }
  
    func toggleRightPanel() {
    }
  
    func addLeftPanelViewController() {
    }
    
    func addRightPanelViewController() {
    }
  
    func animateLeftPanel(#shouldExpand: Bool) {
    }
    
    func animateRightPanel(#shouldExpand: Bool) {
    }
  
    // MARK: Gesture recognizer
  
    func handlePanGesture(recognizer: UIPanGestureRecognizer) {
    }
}

private extension UIStoryboard {
  class func mainStoryboard() -> UIStoryboard { return UIStoryboard(name: "Main", bundle: NSBundle.mainBundle()) }
  
  class func leftViewController() -> SidePanelViewController? {
    return mainStoryboard().instantiateViewControllerWithIdentifier("LeftViewController") as? SidePanelViewController
  }
  
  class func rightViewController() -> SidePanelViewController? {
    return mainStoryboard().instantiateViewControllerWithIdentifier("RightViewController") as? SidePanelViewController
  }
  
  class func centerViewController() -> CenterViewController? {
    return mainStoryboard().instantiateViewControllerWithIdentifier("CenterViewController") as? CenterViewController
  }
}