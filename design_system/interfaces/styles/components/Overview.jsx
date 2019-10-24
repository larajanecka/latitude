/**
 * TEAM: frontend_infra
 *
 * @flow
 */
import * as React from "react";
import {css, StyleSheet} from "aphrodite";

import Highlight from "react-highlight/lib/optimized";
import Link from "../../../../Link";
import Group from "../../../../Group";

import {deprecatedPaddingSizeConstants} from "../../../../styles/deprecatedWhitespace";
import colors from "../../../../colors";
import Text from "../../../../Text";

export default function Styles() {
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.header)}>
        <Group flexDirection="column" gap={20}>
          <div className={css(styles.title)}>
            <Text scale="headline" weight="bold">
              Styles
            </Text>
          </div>
          <div className={css(styles.short)}>
            <Text scale="title">
              Styles are the basic design elements that lay the foundation for
              all UI at Flexport. Designers and engineers should align on style
              terminology and best practices to ensure efficient handoff and
              collaboration.
            </Text>
          </div>
        </Group>
      </div>
      <section className={css(styles.section, styles.intro)}>
        <Group flexDirection="column" gap={20}>
          <Text scale="title" weight="bold">
            Getting Started
          </Text>
          <Text>
            We style components with{" "}
            <Link href="https://github.com/Khan/aphrodite" openInNewTab={true}>
              Aphrodite
            </Link>
            , a css-in-js framework. We`ve ditched the traditional cascading
            stylesheets model in favor of writing styles directly inside
            components. We belive encapsulating styles helps us work toward our
            vision of a reconfigurable suite of modular applications. Buzzwords
            aside, our components should only be concerned about their specific
            styles and nothing else.
          </Text>
          <Text>
            If you`re familiar with SCSS you`ll quickly ramp up to css-in-js. We
            follow{" "}
            <Link
              href="https://github.com/airbnb/javascript/tree/master/css-in-javascript"
              openInNewTab={true}
            >
              Airbnb`s css-in-js style guide
            </Link>{" "}
            but do not have specific conventions defined around our naming
            conventions - reference the best practices section for examples.
          </Text>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Text scale="title" weight="bold">
            Using Aphrodite
          </Text>
          <Group flexDirection="column" gap={12}>
            <Text weight="bold">Imports</Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`import {css, StyleSheet} from "aphrodite";

import colors from "latitude/colors";`}
            </Highlight>
          </Group>

          <Group flexDirection="column" gap={12}>
            <Text weight="bold">Simple Usage</Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`import {css, StyleSheet} from "aphrodite";

import color from "styles/color";
import {deprecatedPaddingSizeConstants} from "styles/whitespace";

const styles = StyleSheet.create({
  wrapper: {
    background: colors.grey10,
    padding: deprecatedPaddingSizeConstants.l,
    border: \`1px solid \${colors.grey30}\`,
    ":hover": {
      borderColor: colors.blue30,
      transition: "border-color 0.25 ease",
    },
  },
  message: {
    textAlign: "center",
  },
});

render() {
  ...
  <div className={css(styles.wrapper)}>
    <div className={css(styles.message)}>
      <Text>{message}</Text>
    </div>
  </div>
  ...
}
`}
            </Highlight>
          </Group>

          <Group flexDirection="column" gap={12}>
            <Text weight="bold">Writing styles</Text>
            <Text>
              Most styles should be applied with a single aphrodite stylesheet
              that is declared alongside the component class definition. There
              are some instances where declaring multiple aphrodite stylesheets
              within one component might be acceptable, but always ask yourself
              if you should be breaking up your code into smaller components.
            </Text>
            <Text>
              Inline styles should only be used for rules with a prop
              dependancy:
            </Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {"<div style={{flex: props.someValueFromSomehwere}}>"}
            </Highlight>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Text scale="title" weight="bold">
            Color
          </Text>
          <Text>
            Color is used sparingly across our apps, refer to our{" "}
            <Link
              href="https://www.flexport.com/design/guidelines/color-system"
              openInNewTab={true}
            >
              color system guidelines
            </Link>{" "}
            for detailed information on choosing colors. Some latitude
            components will have color props (like Icon and Text). Most color
            needs will be simple applications of backgrounds, borders, and
            shadows. When applying color, please follow these guidelines:
          </Text>
          <Group flexDirection="column" gap={8}>
            <Text>- Always directly call colors from `latitude/colors`</Text>
            <Text>- Never hardcode a hex value</Text>
            <Text>- Never modify the tint of a color</Text>
            <Text>- Never use gradients</Text>
            <Text>
              - Use your best judgement (if it looks weird, it`s probably wrong)
            </Text>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <section className={css(styles.section)}>
          <Group flexDirection="column" gap={20}>
            <Text scale="title" weight="bold">
              Whitespace
            </Text>
            <Text>
              Paddings and margins share the same size enum which can be applied
              in horizontal and vertical directions. While this may seem like a
              limitation, there actually should be few drawbacks to a small
              availability of options. Different paddings and margins may be
              combined in various configurations to achieve spacing not
              available (ie. 9px can be achieved with small padding combined
              with an extra-small margin).
            </Text>
            <div className={css(styles.sizesBreakdown)}>
              {Object.keys(deprecatedPaddingSizeConstants).map(size => (
                <React.Fragment key={`${size}-padding-example`}>
                  <Text>{size}</Text>
                  <Text>{deprecatedPaddingSizeConstants[size]}</Text>
                  <div
                    className={css(styles.whitespaceExample)}
                    style={{
                      borderTopWidth: deprecatedPaddingSizeConstants[size],
                    }}
                  />
                </React.Fragment>
              ))}
            </div>
          </Group>
        </section>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              Borders
            </Text>
            <Text>
              Borders help separate content and bring structure to layouts. Most
              of our borders follow simple standards for color and radius.
            </Text>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Standard border</Text>
            <Text>Avoid borders greater than 1px, if possible.</Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`border: \`1px solid \${colors.grey30}\`,`}
            </Highlight>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Standard border radius</Text>
            <Text>
              Round corners help soften our UI and provide a consistent look and
              feel.
            </Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`borderRadius: "3px",`}
            </Highlight>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              Shadows
            </Text>
            <Text>
              Shadows bring depth and hierarchy to our apps. In general we use
              shadows sparingly, but for certain elements with hover states or
              higher z-indexes a shadow can provide helpful differentiation and
              attention.
            </Text>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Standard shadow</Text>
            <Text>
              Avoid colored shadows and use only this style when needed:
            </Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`boxShadow: "0 2px 2px rgba(0, 0, 0, 0.05)",`}
            </Highlight>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              Animation
            </Text>
            <Text>
              Use subtle animations to reinforce actions, guide the user`s eye,
              and bring simplicity to complex transitions. Views can often have
              multiple pieces fighting for the user`s attention—it is easy for
              changes to be lost as users interact and data changes. Animations
              can help the user follow changes and understand how their actions
              imact the data on screen.
            </Text>
            <Text>
              It`s important that animations feel consistent and intentional.
              Use our standard transitions and transformations for any
              animations.
            </Text>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Standard transition</Text>
            <Text>
              Any css rule can be transitioned. We most commonly transition
              opacity, backgroundColor, width, height, and absolute positions
              (top, right, bottom, or left).
            </Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`transition: "opacity 0.3s cubic-bezier(.42,0,.58,1)",`}
            </Highlight>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Multiple transitions</Text>
            <Text>
              Multiple rules can be transitioned with a single call. Do not use
              `all` - transitions should be intentional.
            </Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`transitionProperty: "background, box-shadow, color, fill",
transitionDuration: "300ms",
transitionTimingFunction: "cubic-bezier(.42,0,.58,1)",`}
            </Highlight>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Complex animation</Text>
            <Text>
              ReactCSSTransitionGroup should be used for any animations that
              involve callbacks or more complex movements. Refer to the{" "}
              <Link href="https://reactjs.org/docs/animation.html">
                React documentation
              </Link>{" "}
              for API references or check out{" "}
              <Link href="https://www.flexport.com/design/components/Toaster">
                Latitude`s docs on Toaster
              </Link>{" "}
              to see an example of how we`ve implemented
              ReactCSSTransitionGroup.
            </Text>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              Flexbox
            </Text>
            <Text>
              It is recommended to layout UI with Flexbox since it provides
              superior capabilites and simplicity over the traditional box
              model. Check out the resources section below for general education
              and guides to using Flexbox. Browser support for Flexbox is quite
              good, but not 100% consistent across Flexport supported browsers
              (mainly IE11 support). Always check your app`s requirements and
              verify on{" "}
              <Link href="https://caniuse.com/#feat=flexbox">caniuse</Link>.
            </Text>
            <Text>Common styles coming soon...</Text>
          </Group>

          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Resources</Text>
            <Link href="https://developer.mozilla.org/en-US/docs/Glossary/Flexbox#Further_reading">
              MDN Flexbox - further reading
            </Link>
            <Link href="https://flexboxfroggy.com/">Flexbox froggy</Link>
            <Link href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">
              CSS Tricks - A Complete Guide to Flexbox
            </Link>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              CSS Grid
            </Text>
            <Text>
              CSS grid is a powerful, two-dimensional layout model capable of
              complex layouts that are not possible with either flexbox or the
              traditional box model. Browser support for CSS grid is not
              consistent across Flexport supported browsers (mainly IE11
              support). Always check your app`s requirements and verify on{" "}
              <Link href="https://caniuse.com/#feat=css-grid">caniuse</Link>.
            </Text>
            <Text>Common styles coming soon...</Text>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Resources</Text>
            <Link href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout#Guides">
              MDN CSS Grid - Guides
            </Link>
            <Link href="https://gridbyexample.com/learn/">Grid by Example</Link>
            <Link href="https://learncssgrid.com/">Learn CSS Grid</Link>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              Media queries
            </Text>
            <Text>
              Always build UI considering various screen sizes. Understanding
              your users is very important—sometimes it`s necessary to make
              components respond to browser width with media queries.
            </Text>
            <Text>
              Since the vast majority of our users interact with our app on
              screens larger than 1024px we build desktop-first. Since users can
              resize windows it`s important that we consider how flexible we
              build our UI.
            </Text>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Basic media query</Text>
            <Text>
              Use one or more media queries to adjust or change styles at
              various screen sizes. This example sets the width to 100% when the
              screen width is below 1024px.
            </Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`example: {
  "@media only screen and (max-width: 1024px)": {
    width: "100%",
  },
},`}
            </Highlight>
          </Group>
          <Group flexDirection="column" gap={8}>
            <Text weight="bold">Multiple media queries</Text>
            <Text>
              Each style can set multiple media queries in order to account for
              multiple screen sizes. This example sets the background-color to
              red50 by default and adjusts the background-color to green50 on
              screens smaller than 800px and adjusts again for screens between
              800px and 1200px.
            </Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`example: {
  backgroundColor: colors.red50,
  "@media only screen and (max-width: 799px)": {
    backgroundColor: colors.green50,
  },
  "@media only screen and (min-width: 800px) and (max-width): 1199px)": {
    backgroundColor: colors.yellow50,
  },
},`}
            </Highlight>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              Browser support
            </Text>
            <Text>
              - Users attempting to load an app in Internet Explorer older than
              IE11 will get a banner asking them to upgrade or switch to another
              browser.
            </Text>
            <Text>
              - Users attempting to load an app in an unsupported browser
              (indicated in red above) will get a banner asking them to switch
              to another browser.
            </Text>
            <Text>
              - We don`t attempt to warn Chrome, Firefox and Safari that their
              browser is too old, although we might ask them to switch browsers
              if they`re using CoreApp with something other than Chrome.
            </Text>
          </Group>
          <table className={css(browserSupportStyles.table)}>
            <thead>
              <tr>
                <th className={css(browserSupportStyles.th)} />
                <th className={css(browserSupportStyles.th)}>ClientApp</th>
                <th className={css(browserSupportStyles.th)}>CoreApp</th>
                <th className={css(browserSupportStyles.th)}>PartnerApp</th>
                <th className={css(browserSupportStyles.th)}>OriginApp</th>
                <th className={css(browserSupportStyles.th)}>PublicApp</th>
                <th className={css(browserSupportStyles.th)}>DispatchApp</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className={css(browserSupportStyles.th)}>Google Chrome</th>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Chrome 49 and up</Text>
                </td>
              </tr>
              <tr>
                <th className={css(browserSupportStyles.th)}>Firefox</th>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext" color="red40">
                    Not Supported
                  </Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext" color="red40">
                    Not Supported
                  </Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
              </tr>
              <tr>
                <th className={css(browserSupportStyles.th)}>Safari</th>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext" color="red40">
                    Not Supported
                  </Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext" color="red40">
                    Not Supported
                  </Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
              </tr>
              <tr>
                <th className={css(browserSupportStyles.th)}>360 Browser</th>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext" color="red40">
                    Not Supported
                  </Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext" color="red40">
                    Not Supported
                  </Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">Recent versions</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext" color="red40">
                    Not Supported
                  </Text>
                </td>
              </tr>
              <tr>
                <th className={css(browserSupportStyles.th)}>
                  Microsoft Edge & Internet Explorer
                </th>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">IE11, Edge</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext" color="red40">
                    Not Supported
                  </Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">IE11, Edge</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">IE11, Edge</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">IE11, Edge</Text>
                </td>
                <td className={css(browserSupportStyles.td)}>
                  <Text scale="subtext">IE11, Edge</Text>
                </td>
              </tr>
            </tbody>
          </table>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              Themes
            </Text>
            <Text>
              Our usage of themes is still under review. We use React context
              for defining a ThemeProvider that we use to modify the primary
              color used in various Latitude components. Currently,
              TransmissionApp is the only app which requires themed components
              (Transmission has it`s own brand and visual language so it is
              important that it is visually differentiated from other Flexport
              Apps)
            </Text>
          </Group>
        </Group>
      </section>

      <section className={css(styles.section)}>
        <Group flexDirection="column" gap={20}>
          <Group flexDirection="column" gap={8}>
            <Text scale="title" weight="bold">
              Legacy styles
            </Text>
            <Text>
              Previously, we used a methodology called{" "}
              <Link href="https://github.com/stubbornella/oocss/wiki">
                OOCSS
              </Link>
              , or Object Oriented CSS, which is an approach for writing CSS
              that encourages you to think about your stylesheets as a
              collection of “objects”: reusable, repeatable snippets that can be
              used independently throughout a website. Although our OOCSS
              library is deprecated we still serve the CSS file with our apps
              and host the{" "}
              <Link href="http://flexport.github.io/oocss/docs/base_css.html">
                old styleguide
              </Link>
              .
            </Text>
            {/* eslint-disable-next-line flexport/no-oocss */}
            <Highlight languages={["typescript"]} className="typescript">
              {`<div className="bgYellow" /> {/* this makes the background yellow */}`}
            </Highlight>
            <Text>
              For more info on how we previously used OOCSS view our{" "}
              <Link href="https://flexport.atlassian.net/wiki/spaces/EN/pages/116949210/CSS+Styling#CSS&Styling-OOCSS">
                OOCSS styling guidelines
              </Link>
              .
            </Text>
          </Group>
        </Group>
      </section>
    </div>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  header: {
    paddingTop: deprecatedPaddingSizeConstants.m,
    marginBottom: "100px",
  },
  intro: {
    marginBottom: "72px",
  },
  title: {
    "@media only screen and (max-width: 1200px)": {
      paddingBottom: deprecatedPaddingSizeConstants.l,
    },
  },
  short: {
    maxWidth: "440px",
  },
  section: {
    marginBottom: "96px",
  },
  sizesBreakdown: {
    display: "grid",
    gridTemplateColumns: "80px 80px 1fr",
    gridColumnGap: "12px",
    gridRowGap: "21px",
  },
  whitespaceExample: {
    borderTopStyle: "solid",
    borderTopColor: colors.grey20,
  },
});

const browserSupportStyles = StyleSheet.create({
  table: {
    display: "table",
    tableLayout: "fixed",
    verticalAlign: "top",
    width: "100%",
    maxWidth: "100%",
    minWidth: "750px",
    borderCollapse: "collapse",
    borderSpacing: 0,
    overflowX: "auto",
  },
  th: {
    background: colors.grey10,
    padding: "12px",
  },
  td: {
    wordWrap: "break-word",
    overflow: "auto",
    padding: "12px",
    border: `1px solid ${colors.grey30}`,
  },
});
