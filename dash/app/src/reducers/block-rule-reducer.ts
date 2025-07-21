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
      return createSimpleRule(rule);
    case `both`:
      return handleBothRule(rule);
    case `unless`:
      return handleUnlessRule(rule);
    default:
      return null;
  }
}

function createSimpleRule(rule: {
  case: string;
  value: string;
}): RemoveFns<BlockRuleEditorProps> {
  return {
    type: rule.case === `bundleIdContains` ? `app` : `address`,
    primaryValue: rule.value,
    secondaryValue: ``,
    condition: `always`,
  };
}

function handleBothRule(rule: {
  a: BlockRule;
  b: BlockRule;
}): RemoveFns<BlockRuleEditorProps> | null {
  const { a, b } = rule;

  if (a.case === `bundleIdContains`) {
    return handleBundleIdWithSecondRule(a, b);
  }

  if (isAddressRule(a)) {
    return handleAddressWithFlowType(a, b);
  }

  return null;
}

function handleBundleIdWithSecondRule(
  bundleRule: { value: string },
  secondRule: BlockRule,
): RemoveFns<BlockRuleEditorProps> | null {
  if (isAddressRule(secondRule)) {
    return {
      type: `app`,
      primaryValue: bundleRule.value,
      secondaryValue: secondRule.value,
      condition: `whenAddressContains`,
    };
  }

  if (secondRule.case === `flowTypeIs` && secondRule.value === `browser`) {
    return {
      type: `app`,
      primaryValue: bundleRule.value,
      secondaryValue: ``,
      condition: `whenIsBrowser`,
    };
  }

  return null;
}

function handleAddressWithFlowType(
  addressRule: AddressRule,
  flowRule: BlockRule,
): RemoveFns<BlockRuleEditorProps> | null {
  if (flowRule.case === `flowTypeIs` && flowRule.value === `browser`) {
    return {
      type: `address`,
      primaryValue: addressRule.value,
      secondaryValue: ``,
      condition: `whenIsBrowser`,
    };
  }
  return null;
}

function handleUnlessRule(rule: {
  rule: BlockRule;
  negatedBy: BlockRule[];
}): RemoveFns<BlockRuleEditorProps> | null {
  if (rule.rule.case !== `bundleIdContains`) {
    return null;
  }

  const addressValues: string[] = [];

  for (const negatedRule of rule.negatedBy) {
    if (!isAddressRule(negatedRule)) {
      return null;
    }
    addressValues.push(negatedRule.value);
  }

  return {
    type: `app`,
    primaryValue: rule.rule.value,
    secondaryValue: addressValues.join(`\n`),
    condition: `unlessAddressContains`,
  };
}

type AddressRule = Extract<
  BlockRule,
  | { case: `targetContains` }
  | { case: `hostnameContains` }
  | { case: `hostnameEquals` }
  | { case: `hostnameEndsWith` }
  | { case: `urlContains` }
>;

function isAddressRule(rule: BlockRule): rule is AddressRule {
  return [
    `targetContains`,
    `hostnameContains`,
    `hostnameEquals`,
    `hostnameEndsWith`,
    `urlContains`,
  ].includes(rule.case);
}
