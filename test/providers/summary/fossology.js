// Copyright (c) Microsoft Corporation and others. Licensed under the MIT license.
// SPDX-License-Identifier: MIT

const assert = require('assert')
const summarizer = require('../../../providers/summary/fossology')()
summarizer.logger = { info: () => {} }
const fs = require('fs')
const path = require('path')

describe('FOSSologySummarizer fixtures', () => {
  it('summarizes npm 3.4.0', () => {
    const coordinates = { type: 'npm', provider: 'npmjs', name: 'ajv', revision: '5.1.0' }
    const harvestData = getHarvestData('3.4.0', 'npm')
    const result = summarizer.summarize(coordinates, harvestData)
    assert.deepEqual(result, {
      files: [
        { path: 'package/dist/ajv.min.js' },
        { path: 'package/dist/nodent.min.js', license: 'BSD-2-Clause' },
        { path: 'package/dist/ajv.min.js.map' },
        { path: 'package/lib/refs/$data.json' },
        { path: 'package/lib/refs/json-schema-draft-06.json' },
        { path: 'package/lib/patternGroups.js' },
        { path: 'package/lib/dot/ref.jst' },
        { path: 'package/lib/dot/pattern.jst' },
        { path: 'package/lib/dot/coerce.def' },
        { path: 'package/lib/dot/_limitItems.jst' },
        { path: 'package/lib/dot/allOf.jst' },
        { path: 'package/lib/dot/_limitProperties.jst' },
        { path: 'package/lib/dot/format.jst' },
        { path: 'package/lib/dot/validate.jst' },
        { path: 'package/lib/dot/errors.def' },
        { path: 'package/lib/dot/enum.jst' },
        { path: 'package/lib/dot/contains.jst' },
        { path: 'package/lib/dot/not.jst' },
        { path: 'package/lib/dot/uniqueItems.jst' },
        { path: 'package/lib/dot/properties.jst' },
        { path: 'package/lib/ajv.js' },
        { path: 'package/lib/dotjs/dependencies.js' },
        { path: 'package/lib/dotjs/_limitLength.js' },
        { path: 'package/lib/dotjs/ref.js' },
        { path: 'package/lib/dotjs/items.js' },
        { path: 'package/lib/dotjs/propertyNames.js' },
        { path: 'package/lib/dotjs/oneOf.js' },
        { path: 'package/lib/dotjs/_limitItems.js' },
        { path: 'package/lib/dotjs/format.js' },
        { path: 'package/lib/dotjs/README.md' },
        { path: 'package/lib/dotjs/validate.js' },
        { path: 'package/lib/dotjs/properties.js' },
        { path: 'package/lib/dotjs/_limit.js' },
        { path: 'package/lib/$data.js' },
        { path: 'package/lib/compile/ucs2length.js' },
        { path: 'package/lib/compile/formats.js' },
        { path: 'package/lib/compile/error_classes.js' },
        { path: 'package/lib/compile/schema_obj.js' },
        { path: 'package/lib/compile/rules.js' },
        { path: 'package/lib/compile/index.js' },
        { path: 'package/.tonic_example.js' },
        { path: 'package/scripts/.eslintrc.yml' },
        { path: 'package/scripts/travis-gh-pages' },
        { path: 'package/scripts/bundle.js' },
        { path: 'package/package.json', license: 'MIT' },
        {
          path: 'package/dist/ajv.bundle.js',
          license: 'MIT'
          //attributions: ['Copyright Joyent, Inc. and other Node contributors.']
        },
        { path: 'package/dist/regenerator.min.js', license: 'MIT' },
        { path: 'package/README.md', license: 'MIT' },
        { path: 'package/lib/refs/json-schema-draft-04.json' },
        { path: 'package/lib/refs/json-schema-v5.json' },
        { path: 'package/lib/dot/dependencies.jst' },
        { path: 'package/lib/dot/defaults.def' },
        { path: 'package/lib/dot/_limit.jst' },
        { path: 'package/lib/dot/oneOf.jst' },
        { path: 'package/lib/dot/definitions.def' },
        { path: 'package/lib/dot/anyOf.jst' },
        { path: 'package/lib/dot/items.jst' },
        { path: 'package/lib/dot/multipleOf.jst' },
        { path: 'package/lib/dot/const.jst' },
        { path: 'package/lib/dot/_limitLength.jst' },
        { path: 'package/lib/dot/required.jst' },
        { path: 'package/lib/dot/custom.jst' },
        { path: 'package/lib/dot/propertyNames.jst' },
        { path: 'package/lib/dot/missing.def' },
        { path: 'package/lib/cache.js' },
        { path: 'package/lib/dotjs/multipleOf.js' },
        { path: 'package/lib/dotjs/required.js' },
        { path: 'package/lib/dotjs/_limitProperties.js' },
        { path: 'package/lib/dotjs/uniqueItems.js' },
        { path: 'package/lib/dotjs/custom.js' },
        { path: 'package/lib/dotjs/enum.js' },
        { path: 'package/lib/dotjs/pattern.js' },
        { path: 'package/lib/dotjs/const.js' },
        { path: 'package/lib/dotjs/allOf.js' },
        { path: 'package/lib/dotjs/not.js' },
        { path: 'package/lib/dotjs/anyOf.js' },
        { path: 'package/lib/dotjs/contains.js' },
        { path: 'package/lib/keyword.js' },
        { path: 'package/lib/ajv.d.ts' },
        { path: 'package/lib/compile/equal.js' },
        { path: 'package/lib/compile/async.js' },
        { path: 'package/lib/compile/util.js' },
        { path: 'package/lib/compile/_rules.js' },
        { path: 'package/lib/compile/resolve.js' },
        {
          path: 'package/LICENSE',
          license: 'MIT'
          // attributions: ['Copyright (c) 2015 Evgeny Poberezkin']
        },
        { path: 'package/scripts/prepare-tests' },
        { path: 'package/scripts/compile-dots.js' },
        { path: 'package/scripts/info' }
      ],
      licensed: { declared: 'MIT' }
    })
  })

  it('summarizes gem 3.4.0', () => {
    const coordinates = { type: 'gem', provider: 'rubygems', name: 'mocha', revision: '1.7.0' }
    const harvestData = getHarvestData('3.4.0', 'gem')
    const result = summarizer.summarize(coordinates, harvestData)
    assert.deepEqual(result, {
      files: [
        { path: '.rubocop.yml' },
        {
          path: 'COPYING.md',
          license: 'MIT'
          //attributions: ['Copyright Revieworld Ltd. 2006']
        },
        { path: 'yard-templates/default/layout/html/setup.rb' },
        { path: 'test/integration/test_unit_test.rb' },
        { path: 'test/integration/mini_test_test.rb' },
        { path: 'test/method_definer.rb' },
        { path: 'test/assertions.rb' },
        { path: 'test/acceptance/stubbing_frozen_object_test.rb' },
        { path: 'test/acceptance/bug_21465_test.rb' },
        { path: 'test/acceptance/stub_instance_method_defined_on_class_test.rb' },
        { path: 'test/acceptance/stub_instance_method_defined_on_class_and_aliased_test.rb' },
        { path: 'test/acceptance/stub_class_method_defined_on_module_test.rb' },
        { path: 'test/acceptance/stubbing_non_existent_any_instance_method_test.rb' },
        { path: 'test/acceptance/expected_invocation_count_test.rb' },
        { path: 'test/acceptance/stubbing_non_public_instance_method_test.rb' },
        { path: 'test/acceptance/stub_class_method_defined_on_class_test.rb' },
        { path: 'test/acceptance/mocha_example_test.rb' },
        { path: 'test/acceptance/failure_messages_test.rb' },
        { path: 'test/acceptance/stubbing_on_non_mock_object_test.rb' },
        { path: 'test/acceptance/return_value_test.rb' },
        { path: 'test/acceptance/stubbing_non_existent_class_method_test.rb' },
        { path: 'test/acceptance/stub_instance_method_defined_on_module_test.rb' },
        { path: 'test/acceptance/stub_instance_method_defined_on_kernel_module_test.rb' },
        { path: 'test/acceptance/bug_18914_test.rb' },
        { path: 'test/acceptance/stubbing_non_public_any_instance_method_test.rb' },
        { path: 'test/acceptance/sequence_test.rb' },
        { path: 'test/acceptance/mock_with_initializer_block_test.rb' },
        { path: 'test/acceptance/exception_rescue_test.rb' },
        { path: 'test/acceptance/optional_parameters_test.rb' },
        { path: 'test/acceptance/states_test.rb' },
        { path: 'test/acceptance/stub_method_defined_on_module_and_aliased_test.rb' },
        { path: 'test/acceptance/stubba_example_test.rb' },
        { path: 'test/acceptance/partial_mocks_test.rb' },
        { path: 'test/acceptance/acceptance_test_helper.rb' },
        { path: 'test/acceptance/raise_exception_test.rb' },
        { path: 'test/acceptance/parameter_matcher_test.rb' },
        { path: 'test/acceptance/mocha_test_result_test.rb' },
        { path: 'test/acceptance/stub_class_method_defined_on_active_record_association_proxy_test.rb' },
        { path: '/tmFile CONTRIBUTING.md' },
        { path: 'bin/build-matrix' },
        { path: 'yard-templates/default/layout/html/google_analytics.erb' },
        {
          path: 'README.md',
          license: 'MIT'
          //  attributions: ['&copy; Copyright Revieworld Ltd. 2006']
        },
        { path: 'test/integration/shared_tests.rb' },
        { path: 'test/mini_test_result.rb' },
        { path: 'test/test_helper.rb' },
        { path: 'test/acceptance/prepend_test.rb' },
        { path: 'test/acceptance/stub_module_method_test.rb' },
        { path: 'test/acceptance/stubbing_same_class_method_on_parent_and_child_classes_test.rb' },
        { path: 'test/acceptance/issue_70_test.rb' },
        { path: 'test/acceptance/stubbing_non_existent_instance_method_test.rb' },
        { path: 'test/acceptance/stubbing_non_public_class_method_test.rb' },
        { path: 'test/acceptance/stubbing_error_backtrace_test.rb' },
        { path: 'test/acceptance/stubbing_method_unnecessarily_test.rb' },
        { path: 'test/acceptance/stubbing_method_accepting_block_parameter_test.rb' },
        { path: 'test/acceptance/stub_any_instance_method_test.rb' },
        { path: 'test/acceptance/stub_instance_method_defined_on_superclass_test.rb' },
        { path: 'test/acceptance/stubbing_nil_test.rb' },
        { path: 'test/acceptance/prevent_use_of_mocha_outside_test_test.rb' },
        { path: 'test/acceptance/stub_any_instance_method_defined_on_superclass_test.rb' },
        { path: 'test/acceptance/stub_instance_method_defined_on_active_record_association_proxy_test.rb' },
        { path: 'test/acceptance/throw_test.rb' },
        { path: 'test/acceptance/multiple_expectations_failure_message_test.rb' },
        { path: 'test/acceptance/expectations_on_multiple_methods_test.rb' },
        { path: 'test/acceptance/mock_test.rb' },
        { path: 'test/acceptance/stub_test.rb' },
        { path: 'test/acceptance/stub_instance_method_defined_on_singleton_class_test.rb' },
        { path: 'test/acceptance/unstubbing_test.rb' },
        { path: 'test/acceptance/issue_272_test.rb' },
        { path: 'test/acceptance/issue_65_test.rb' },
        { path: 'test/acceptance/bug_21563_test.rb' },
        { path: 'test/acceptance/stub_instance_method_defined_on_object_class_test.rb' },
        { path: 'test/acceptance/stub_class_method_defined_on_superclass_test.rb' },
        { path: 'test/acceptance/mocked_methods_dispatch_test.rb' },
        { path: 'test/acceptance/unexpected_invocation_test.rb' },
        { path: 'test/acceptance/stubba_test_result_test.rb' },
        { path: 'test/acceptance/stub_everything_test.rb' },
        { path: '/p/cd-VtnWMR/data/test/unit/object_methods_test.rb' },
        { path: 'test/unit/return_values_test.rb' },
        { path: 'test/unit/state_machine_test.rb' },
        { path: 'test/unit/mockery_test.rb' },
        { path: 'test/unit/backtrace_filter_test.rb' },
        { path: 'test/unit/expectation_test.rb' },
        { path: 'test/unit/no_yields_test.rb' },
        { path: 'test/unit/date_time_inspect_test.rb' },
        { path: 'test/unit/hash_inspect_test.rb' },
        { path: 'test/unit/sequence_test.rb' },
        { path: 'test/unit/single_return_value_test.rb' },
        { path: 'test/unit/parameter_matchers/equivalent_uri_test.rb' },
        { path: 'test/unit/parameter_matchers/regexp_matches_test.rb' },
        { path: 'test/unit/parameter_matchers/any_of_test.rb' },
        { path: 'test/unit/parameter_matchers/has_key_test.rb' },
        { path: 'test/unit/parameter_matchers/stub_matcher.rb' },
        { path: 'test/unit/parameter_matchers/anything_test.rb' },
        { path: 'test/unit/parameter_matchers/responds_with_test.rb' },
        { path: 'test/unit/parameter_matchers/instance_of_test.rb' },
        { path: 'test/unit/parameter_matchers/is_a_test.rb' },
        { path: 'test/unit/yield_parameters_test.rb' },
        { path: 'test/unit/parameters_matcher_test.rb' },
        { path: 'test/unit/class_methods_test.rb' },
        { path: 'test/unit/central_test.rb' },
        { path: 'test/unit/exception_raiser_test.rb' },
        { path: 'test/unit/cardinality_test.rb' },
        { path: 'test/deprecation_disabler.rb' },
        { path: 'test/test_unit_result.rb' },
        { path: 'test/test_runner.rb' },
        { path: 'lib/mocha.rb' },
        { path: 'lib/mocha/method_matcher.rb' },
        { path: 'lib/mocha/argument_iterator.rb' },
        { path: 'lib/mocha/integration/monkey_patcher.rb' },
        { path: 'lib/mocha/integration/test_unit/gem_version_230_to_250.rb' },
        { path: 'lib/mocha/integration/test_unit/gem_version_200.rb' },
        { path: 'lib/mocha/integration/test_unit/adapter.rb' },
        { path: 'lib/mocha/integration/test_unit/gem_version_203_to_220.rb' },
        { path: 'lib/mocha/integration/mini_test/version_201_to_222.rb' },
        { path: 'lib/mocha/integration/mini_test/version_2110_to_2111.rb' },
        { path: 'lib/mocha/integration/mini_test/version_200.rb' },
        { path: 'lib/mocha/integration/mini_test/version_230_to_2101.rb', license: 'NOASSERTION' },
        { path: 'test/unit/receivers_test.rb' },
        { path: 'test/unit/array_inspect_test.rb' },
        { path: 'test/unit/module_methods_test.rb' },
        { path: 'test/unit/single_yield_test.rb' },
        { path: 'test/unit/hooks_test.rb' },
        { path: 'test/unit/any_instance_method_test.rb' },
        { path: 'test/unit/change_state_side_effect_test.rb' },
        { path: 'test/unit/in_state_ordering_constraint_test.rb' },
        { path: 'test/unit/mock_test.rb' },
        { path: 'test/unit/thrower_test.rb' },
        { path: 'test/unit/string_inspect_test.rb' },
        { path: 'test/unit/parameter_matchers/yaml_equivalent_test.rb' },
        { path: 'test/unit/parameter_matchers/equals_test.rb' },
        { path: 'test/unit/parameter_matchers/has_value_test.rb' },
        { path: 'test/unit/parameter_matchers/not_test.rb' },
        { path: 'test/unit/parameter_matchers/includes_test.rb' },
        { path: 'test/unit/parameter_matchers/has_entries_test.rb' },
        { path: 'test/unit/parameter_matchers/has_entry_test.rb' },
        { path: 'test/unit/parameter_matchers/kind_of_test.rb' },
        { path: 'test/unit/parameter_matchers/all_of_test.rb' },
        { path: 'test/unit/configuration_test.rb' },
        { path: 'test/unit/class_method_test.rb' },
        { path: 'test/unit/multiple_yields_test.rb' },
        { path: 'test/unit/method_matcher_test.rb' },
        { path: 'test/unit/expectation_list_test.rb' },
        { path: 'test/minitest_result.rb' },
        { path: 'test/execution_point.rb' },
        { path: 'test/simple_counter.rb' },
        { path: 'lib/mocha_standalone.rb' },
        { path: 'lib/mocha/change_state_side_effect.rb' },
        { path: 'lib/mocha/class_methods.rb' },
        { path: 'lib/mocha/integration/test_unit.rb' },
        { path: 'lib/mocha/integration/mini_test.rb' },
        { path: 'lib/mocha/integration/test_unit/nothing.rb' },
        { path: 'lib/mocha/integration/test_unit/gem_version_201_to_202.rb' },
        { path: 'lib/mocha/integration/test_unit/ruby_version_186_and_above.rb' },
        { path: 'lib/mocha/integration/test_unit/ruby_version_185_and_below.rb' },
        { path: 'lib/mocha/integration/mini_test/nothing.rb' },
        { path: 'lib/mocha/integration/mini_test/version_140.rb' },
        { path: 'lib/mocha/integration/mini_test/adapter.rb' },
        { path: 'lib/mocha/integration/mini_test/version_13.rb' },
        { path: 'lib/mocha/integration/mini_test/version_142_to_172.rb' },
        { path: 'lib/mocha/integration/mini_test/exception_translation.rb' },
        { path: 'lib/mocha/return_values.rb' },
        { path: 'lib/mocha/test_unit.rb' },
        { path: 'lib/mocha/backtrace_filter.rb' },
        { path: 'lib/mocha/module_method.rb' },
        { path: 'lib/mocha/mock.rb' },
        { path: 'lib/mocha/module_methods.rb' },
        { path: 'lib/mocha/single_return_value.rb' },
        { path: 'lib/mocha/version.rb' },
        { path: 'lib/mocha/mockery.rb' },
        { path: 'lib/mocha/pretty_parameters.rb' },
        { path: 'lib/mocha/expectation_error_factory.rb' },
        { path: 'lib/mocha/error_with_filtered_backtrace.rb' },
        { path: 'lib/mocha/inspect.rb' },
        { path: 'lib/mocha/standalone.rb' },
        { path: 'lib/mocha/mini_test.rb' },
        { path: 'lib/mocha/parameter_matchers/base.rb' },
        { path: 'lib/mocha/parameter_matchers/instance_of.rb' },
        { path: 'lib/mocha/parameter_matchers/all_of.rb' },
        { path: 'lib/mocha/parameter_matchers/equals.rb' },
        { path: 'lib/mocha/parameter_matchers/includes.rb' },
        { path: 'lib/mocha/parameter_matchers/is_a.rb' },
        { path: 'lib/mocha/parameter_matchers/anything.rb' },
        { path: 'lib/mocha/parameter_matchers/kind_of.rb' },
        { path: 'lib/mocha/parameter_matchers/responds_with.rb' },
        { path: 'lib/mocha/parameter_matchers/has_value.rb' },
        { path: 'lib/mocha/parameter_matchers/optionally.rb' },
        { path: 'lib/mocha/unexpected_invocation.rb' },
        { path: 'lib/mocha/detection/test_unit.rb' },
        { path: 'lib/mocha/central.rb' },
        { path: 'lib/mocha/no_yields.rb' },
        { path: 'lib/mocha/hooks.rb' },
        { path: 'lib/mocha/names.rb' },
        { path: 'lib/mocha/instance_method.rb' },
        { path: 'lib/mocha/api.rb' },
        { path: 'lib/mocha/configuration.rb' },
        { path: 'lib/mocha/debug.rb' },
        { path: 'lib/mocha/class_method.rb' },
        { path: 'init.rb' },
        { path: '.rubocop_todo.yml' },
        { path: 'mocha.gemspec', license: 'BSD-2-Clause' },
        { path: '.yardopts' },
        { path: 'lib/mocha/integration/mini_test/version_141.rb' },
        { path: 'lib/mocha/integration/mini_test/version_2112_to_320.rb' },
        { path: 'lib/mocha/integration/assertion_counter.rb' },
        { path: 'lib/mocha/ruby_version.rb' },
        { path: 'lib/mocha/logger.rb' },
        { path: 'lib/mocha/yield_parameters.rb' },
        { path: 'lib/mocha/parameters_matcher.rb' },
        { path: 'lib/mocha/single_yield.rb' },
        { path: 'lib/mocha/setup.rb' },
        { path: 'lib/mocha/expectation_error.rb' },
        { path: 'lib/mocha/in_state_ordering_constraint.rb' },
        { path: 'lib/mocha/object_methods.rb' },
        { path: 'lib/mocha/any_instance_method.rb' },
        { path: 'lib/mocha/expectation_list.rb' },
        { path: 'lib/mocha/exception_raiser.rb' },
        { path: 'lib/mocha/cardinality.rb' },
        { path: 'lib/mocha/is_a.rb' },
        { path: 'lib/mocha/integration.rb' },
        { path: 'lib/mocha/parameter_matchers/any_of.rb' },
        { path: 'lib/mocha/parameter_matchers/regexp_matches.rb' },
        { path: 'lib/mocha/parameter_matchers/object.rb' },
        { path: 'lib/mocha/parameter_matchers/any_parameters.rb' },
        { path: 'lib/mocha/parameter_matchers/has_key.rb' },
        { path: 'lib/mocha/parameter_matchers/equivalent_uri.rb' },
        { path: 'lib/mocha/parameter_matchers/has_entry.rb' },
        { path: 'lib/mocha/parameter_matchers/not.rb' },
        { path: 'lib/mocha/parameter_matchers/has_entries.rb' },
        { path: 'lib/mocha/parameter_matchers/yaml_equivalent.rb' },
        { path: 'lib/mocha/multiple_yields.rb' },
        { path: 'lib/mocha/not_initialized_error.rb' },
        { path: 'lib/mocha/detection/mini_test.rb' },
        { path: 'lib/mocha/parameter_matchers.rb' },
        { path: 'lib/mocha/thrower.rb' },
        { path: 'lib/mocha/sequence.rb' },
        { path: 'lib/mocha/state_machine.rb' },
        { path: 'lib/mocha/receivers.rb' },
        { path: 'lib/mocha/expectation.rb' },
        { path: 'lib/mocha/deprecation.rb' },
        { path: 'lib/mocha/stubbing_error.rb' },
        { path: 'lib/mocha/minitest.rb' },
        { path: 'Rakefile' },
        { path: 'RELEASE.md', license: 'MIT' },
        { path: 'Gemfile' },
        { path: '.gemtest' },
        { path: 'gemfiles/Gemfile.minitest.2.11.2' },
        { path: 'gemfiles/Gemfile.minitest.1.3.0' },
        { path: 'gemfiles/Gemfile.minitest.2.0.0' },
        { path: 'gemfiles/Gemfile.minitest.1.4.1' },
        { path: 'gemfiles/Gemfile.minitest.1.4.2' },
        { path: 'gemfiles/Gemfile.minitest.2.3.0' },
        { path: 'gemfiles/Gemfile.minitest.2.11.0' },
        { path: 'gemfiles/Gemfile.minitest.1.4.0' },
        { path: 'gemfiles/Gemfile.test-unit.2.0.3' },
        { path: 'gemfiles/Gemfile.minitest.2.0.1' },
        { path: 'gemfiles/Gemfile.minitest.latest' },
        { path: 'gemfiles/Gemfile.test-unit.2.0.0' },
        { path: 'gemfiles/Gemfile.test-unit.latest' },
        {
          path: 'MIT-LICENSE.md',
          license: 'MIT'
          //attributions: ['Copyright (c) 2006 Revieworld Ltd.']
        }
        //{ path: 'CONTRIBUTING.md' },
        //{ path: 'gemfiles/Gemfile.test-unit.2.0.1' }
      ]
    })
  })

  it('summarizes git 3.4.0', () => {
    const coordinates = {
      type: 'git',
      provider: 'github',
      namespace: 'microsoft',
      name: 'redie',
      revision: '8a38bc262b675da0dbd7d885af765582f398a613'
    }
    const harvestData = getHarvestData('3.4.0', 'git')
    const result = summarizer.summarize(coordinates, harvestData)
    assert.deepEqual(result, {
      files: [
        { path: 'screenshot.png' },
        { path: 'README.md', license: 'NOASSERTION' }, // nomos reports this as 'Microsoft-possibility'
        { path: '.vscode/launch.json' },
        { path: '.gitignore' },
        { path: 'package.json', license: 'MIT' },
        { path: '.gitattributes' },
        {
          path: 'LICENSE',
          license: 'MIT'
          //attributions: ['Copyright (c) Microsoft Corporation']
        },
        {
          path: 'index.js',
          license: 'MIT'
          // attributions: [
          //   'Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT License. See LICENSE in the project root for license information.'
          // ]
        }
      ],
      licensed: { declared: 'MIT' }
    })
  })
})

function getHarvestData(version, test) {
  const fileName = path.join(__dirname, `../../fixtures/fossology/${version}/${test}.json`)
  if (fs.existsSync(fileName)) {
    return JSON.parse(fs.readFileSync(fileName))
  }
}