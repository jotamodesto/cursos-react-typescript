import { TAB_SELECTED, TABS_SHOWN } from "../../constants";

export function selectTab(tabId) {
    return {
        type: TAB_SELECTED,
        payload: tabId
    }
}

export function showTabs(...tabIds) {
    const tabsToShow = {}
    tabIds.forEach(e => tabsToShow[e] = true)

    return {
        type: TABS_SHOWN,
        payload: tabsToShow
    }
}