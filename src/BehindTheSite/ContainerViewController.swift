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


class ContainerViewController: UIViewController, UIGestureRecognizerDelegate, CenterViewControllerDelegate {
    
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
        
        // MARK: Gesture recognizer
        let panGestureRecognizer = UIPanGestureRecognizer(target: self, action: "handlePanGesture:")
        centerNavigationController.view.addGestureRecognizer(panGestureRecognizer)
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
    
    func collapseSidePanels() {
        switch (currentState) {
        case .RightPanelExpanded:
            toggleNavigationPanel()
        case .LeftPanelExpanded:
            toggleSettingsPanel()
        default:
            break
        }
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
        let gestureIsDraggingFromLeftToRight = (recognizer.velocityInView(view).x > 0)
        
        switch(recognizer.state) {
        case .Began:
            if (currentState == .BothCollapsed) {
                if (gestureIsDraggingFromLeftToRight) {
                    addNavigationPanelViewController()
                } else {
                    addSettingsPanelViewController()
                }
                
                showShadowForCenterViewController(true)
            }
        case .Changed:
            recognizer.view!.center.x = recognizer.view!.center.x + recognizer.translationInView(view).x
            recognizer.setTranslation(CGPointZero, inView: view)
        case .Ended:
            if (navigationPanelViewController != nil) {
                // animate the side panel open or closed based on whether the view has moved more or less than halfway
                let hasMovedGreaterThanHalfway = recognizer.view!.center.x > view.bounds.size.width
                animateSidePanel(.LeftPanelExpanded, shouldExpand: hasMovedGreaterThanHalfway)
            } else if (settingsPanelViewController != nil) {
                let hasMovedGreaterThanHalfway = recognizer.view!.center.x < 0
                animateSidePanel(.RightPanelExpanded, shouldExpand: hasMovedGreaterThanHalfway)
            }
        default:
            break
        }
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