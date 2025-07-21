import { type BlockRuleEditorProps } from '@dash/components';
import type { BlockRule, RemoveFns } from '@dash/types';

export function blockRuleToProps(
  rule: BlockRule,
): RemoveFns<BlockRuleEditorProps> | null {
  switch (rule.case) {
    case `bundleIdContains`:
    case `targetContains`:
    case `hostnameContains`:
    case `hostnameEquals`:
    case `hostnameEndsWith`:
    case `urlContains`:
      return {
        type: rule.case === `bundleIdContains` ? `app` : `address`,
        primaryValue: rule.value,
        secondaryValue: ``,
        condition: `always`,
      };
    case `both`:
      switch (rule.a.case) {
        case `bundleIdContains`: {
          switch (rule.b.case) {
            case `bundleIdContains`:
            case `targetContains`:
            case `hostnameContains`:
            case `hostnameEquals`:
            case `hostnameEndsWith`:
            case `urlContains`:
              return {
                type: `app`,
                primaryValue: rule.a.value,
                secondaryValue: rule.b.value,
                condition: `whenAddressContains`,
              };
            case `flowTypeIs`:
              return rule.b.value === `browser`
                ? {
                    type: `app`,
                    primaryValue: rule.a.value,
                    secondaryValue: ``,
                    condition: `whenIsBrowser`,
                  }
                : null;
            default:
              return null;
          }
        }
        case `targetContains`:
        case `hostnameContains`:
        case `hostnameEquals`:
        case `hostnameEndsWith`:
        case `urlContains`:
          return rule.b.case === `flowTypeIs` && rule.b.value === `browser`
            ? {
                type: `address`,
                primaryValue: rule.a.value,
                secondaryValue: ``,
                condition: `whenIsBrowser`,
              }
            : null;
        default:
          return null;
      }
    case `unless`: {
      if (rule.rule.case !== `bundleIdContains`) {
        return null;
      }
      var secondaryValue = ``;
      for (const negatedBy of rule.negatedBy) {
        switch (negatedBy.case) {
          case `targetContains`:
          case `hostnameContains`:
          case `hostnameEquals`:
          case `hostnameEndsWith`:
          case `urlContains`:
            secondaryValue += negatedBy.value + `\n`;
            break;
          default:
            return null;
        }
      }
      return {
        type: `app`,
        primaryValue: rule.rule.value,
        secondaryValue: secondaryValue.trim(),
        condition: `unlessAddressContains`,
      };
    }
    case `flowTypeIs`:
      return null;
  }
}
