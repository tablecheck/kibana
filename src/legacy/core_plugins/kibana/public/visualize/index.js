/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import './editor/editor';
import 'ui/draggable/draggable_container';
import 'ui/draggable/draggable_item';
import 'ui/draggable/draggable_handle';
import './saved_visualizations/_saved_vis';
import './saved_visualizations/saved_visualizations';
import 'ui/filters/sort_prefix_first';
import uiRoutes from 'ui/routes';
import visualizeListingTemplate from './listing/visualize_listing.html';
import { VisualizeListingController } from './listing/visualize_listing';
import { VisualizeConstants } from './visualize_constants';
import { FeatureCatalogueRegistryProvider, FeatureCatalogueCategory } from 'ui/registry/feature_catalogue';
import { getLandingBreadcrumbs, getWizardStep1Breadcrumbs } from './breadcrumbs';

uiRoutes
  .defaults(/visualize/, {
    requireDefaultIndex: true
  })
  .when(VisualizeConstants.LANDING_PAGE_PATH, {
    template: visualizeListingTemplate,
    k7Breadcrumbs: getLandingBreadcrumbs,
    controller: VisualizeListingController,
    controllerAs: 'listingController',
    resolve: {
      createNewVis: () => false,
    },
  })
  .when(VisualizeConstants.WIZARD_STEP_1_PAGE_PATH, {
    template: visualizeListingTemplate,
    k7Breadcrumbs: getWizardStep1Breadcrumbs,
    controller: VisualizeListingController,
    controllerAs: 'listingController',
    resolve: {
      createNewVis: () => true,
    },
  });

FeatureCatalogueRegistryProvider.register(i18n => {
  return {
    id: 'visualize',
    title: 'Visualize',
    description: i18n(
      'kbn.visualize.visualizeDescription',
      {
        defaultMessage: 'Create visualizations and aggregate data stores in your Elasticsearch indices.',
      }
    ),
    icon: 'visualizeApp',
    path: `/app/kibana#${VisualizeConstants.LANDING_PAGE_PATH}`,
    showOnHomePage: true,
    category: FeatureCatalogueCategory.DATA
  };
});
