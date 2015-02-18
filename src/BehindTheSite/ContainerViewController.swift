//
//  ContainerViewController.swift
//  BehindTheSite
//
//  Created by Nik Khilnani on 2/17/15.
//  Copyright (c) 2015 Nik Khilnani. All rights reserved.
//

import UIKit
import QuartzCore

enum SlideOutState :Int {
    case BothCollapsed
    case LeftPanelExpanded
    case RightPanelExpanded
}


class ContainerViewController: UIViewController, CenterViewControllerDelegate {
    
    var centerNavigationController: UINavigationController!
    var centerViewController: CenterViewController!
    
    var currentState: SlideOutState = .BothCollapsed {
        didSet {
            let shouldShowShadow = currentState != .BothCollapsed
            showShadowForCenterViewController(shouldShowShadow)
        }
    }
    
    var navigationPanelViewController: NavigationPanelViewController?
    var settingsPanelViewController: SettingsPanelViewController?
    
    let centerPanelExpandedOffset: CGFloat = 60
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        centerViewController = UIStoryboard.centerViewController()
        centerViewController.delegate = self
        
        // wrap the centerViewController in a navigation controller, so we can push views to it
        // and display bar button items in the navigation bar
        centerNavigationController = UINavigationController(rootViewController: centerViewController)
        view.addSubview(centerNavigationController.view)
        addChildViewController(centerNavigationController)
        
        centerNavigationController.didMoveToParentViewController(self)
    }
    
    // MARK: CenterViewController delegate methods
    
    func toggleNavigationPanel() {
        let notAlreadyExpanded = (currentState != .LeftPanelExpanded)
        
        if notAlreadyExpanded {
            addNavigationPanelViewController()
        }
        
        animateSidePanel(.LeftPanelExpanded, shouldExpand: notAlreadyExpanded)
    }
    
    func toggleSettingsPanel() {
        let notAlreadyExpanded = (currentState != .RightPanelExpanded)
        
        if notAlreadyExpanded {
            addSettingsPanelViewController()
        }
        
        animateSidePanel(.RightPanelExpanded, shouldExpand: notAlreadyExpanded)
    }
    
    func addNavigationPanelViewController() {
        if (navigationPanelViewController == nil) {
            navigationPanelViewController = UIStoryboard.navigationPanelViewController()
            
            navigationPanelViewController!.refreshView(centerViewController)
            
            addSidePanelController(navigationPanelViewController! )
        }
    }
    
    func addSettingsPanelViewController() {
        if (settingsPanelViewController == nil) {
            settingsPanelViewController = UIStoryboard.settingsPanelViewController()
            
            settingsPanelViewController!.refreshView(centerViewController)
            
            addSidePanelController(settingsPanelViewController!)
        }
    }
    
    func addSidePanelController(panelViewController: UIViewController) {
        view.insertSubview(panelViewController.view, atIndex: 0)
        
        addChildViewController(panelViewController)
        panelViewController.didMoveToParentViewController(self)
    }
    
    func animateSidePanel(state: SlideOutState, shouldExpand: Bool) {
        if (shouldExpand) {
            //println(state.rawValue)
            currentState = state
            
            if (state == SlideOutState.LeftPanelExpanded) {
                animateCenterPanelXPosition(targetPosition: CGRectGetWidth(centerNavigationController.view.frame) - centerPanelExpandedOffset)
            } else if ( state == SlideOutState.RightPanelExpanded) {
                animateCenterPanelXPosition(targetPosition: -CGRectGetWidth(centerNavigationController.view.frame) + centerPanelExpandedOffset)
            }
        } else {
            animateCenterPanelXPosition(targetPosition: 0) { finished in
                self.currentState = .BothCollapsed
                
                if (state == .LeftPanelExpanded) {
                    self.navigationPanelViewController!.view.removeFromSuperview()
                    self.navigationPanelViewController = nil;
                } else if ( state == .RightPanelExpanded) {
                    self.settingsPanelViewController!.view.removeFromSuperview()
                    self.settingsPanelViewController = nil;
                }
            }
        }
    }
    
    func showShadowForCenterViewController(shouldShowShadow: Bool) {
        if (shouldShowShadow) {
            centerNavigationController.view.layer.shadowOpacity = 0.8
        } else {
            centerNavigationController.view.layer.shadowOpacity = 0.0
        }
    }
    
    func animateCenterPanelXPosition(#targetPosition: CGFloat, completion: ((Bool) -> Void)! = nil) {
        UIView.animateWithDuration(0.5, delay: 0, usingSpringWithDamping: 0.8, initialSpringVelocity: 0, options: .CurveEaseInOut, animations: {
            self.centerNavigationController.view.frame.origin.x = targetPosition
            }, completion: completion)
    }
    
    // MARK: Gesture recognizer
    
    func handlePanGesture(recognizer: UIPanGestureRecognizer) {
    }
}

private extension UIStoryboard {
    class func mainStoryboard() -> UIStoryboard { return UIStoryboard(name: "Main", bundle: NSBundle.mainBundle()) }
    
    class func navigationPanelViewController() -> NavigationPanelViewController? {
        return mainStoryboard().instantiateViewControllerWithIdentifier("NavigationPanelViewController") as? NavigationPanelViewController
    }
    
    class func settingsPanelViewController() -> SettingsPanelViewController? {
        return mainStoryboard().instantiateViewControllerWithIdentifier("SettingsPanelViewController") as? SettingsPanelViewController
    }
    
    class func centerViewController() -> CenterViewController? {
        return mainStoryboard().instantiateViewControllerWithIdentifier("CenterViewController") as? CenterViewController
    }
}