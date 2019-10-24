/**
 * TEAM: frontend_infra
 * @flow
 */

import React, {useState, useEffect} from "react";
import {throttle} from "lodash";
import {StyleSheet, css} from "aphrodite";
import type {IndexEntry} from "./IndexedPage";
import colors from "../../../../../colors";

type Props = {|
  +entries: Array<IndexEntry>,
|};

const OFFSET = 36;

function PageIndex({entries}: Props) {
  const [currentlyActive, setCurrentlyActive] = useState(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const lastNegativeEntry = entries.reduce((acc, cur) => {
        if (cur.element.getBoundingClientRect().top - OFFSET <= 0) return cur;
        return acc;
      }, null);

      setCurrentlyActive(lastNegativeEntry);
    });

    handleScroll();

    if (typeof window && typeof window.addEventListener === "function") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (typeof window && typeof window.addEventListener === "function") {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [entries, setCurrentlyActive]);

  return (
    <nav className={css(styles.nav)}>
      <ul className={css(styles.list)}>
        {entries.map(({name, element}) => {
          const onClickHandler = () => {
            element.scrollIntoView({block: "start"});
          };

          return (
            <li key={name}>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
              <div
                role="button"
                tabIndex={0}
                onClick={onClickHandler}
                className={css(
                  styles.item,
                  currentlyActive &&
                    currentlyActive.name === name &&
                    styles.itemActive
                )}
              >
                {name}
              </div>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "fixed",
    width: 120,
    top: 164,
    right: 50,
    background: colors.white,
    zIndex: 1,
    "@media (max-width: 1023px)": {
      display: "none",
    },
  },
  list: {
    listStyleType: "none",
    margin: 0,
    paddingLeft: 0,
  },
  item: {
    borderLeft: `1px solid ${colors.grey30}`,
    paddingLeft: "8px",
    color: colors.grey50,
    cursor: "pointer",
    ":hover": {
      color: colors.blue30,
    },
    ":focus": {
      outline: "none",
      color: colors.blue30,
    },
  },
  itemActive: {
    borderColor: colors.grey50,
    color: colors.grey60,
    ":hover": {
      color: colors.grey60,
    },
    ":focus": {
      color: colors.grey60,
    },
  },
});

export default PageIndex;
