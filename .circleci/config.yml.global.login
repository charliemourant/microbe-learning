version: 2.1

orbs:
  lpg-common-k8s: leisurepassgroup/common-k8s@0
  cypress: cypress-io/cypress@1

executors:
  cypress-dev:
    docker:
      - image: 'cypress/browsers:node12.13.0-chrome78-ff70'
    environment:
      CLUSTER: dev-euw2
      REGION: eu-west-2

parameters:
  service-name:
    type: string
    default: your-service-name-goes-here
  brand-name:
    type: string
    default: your-team-brand-goes-here

commands:
  http-proxy:
    steps:
      - run:
          name: "Setup HTTP proxy"
          command: |
            echo "export HTTPS_PROXY=http://127.0.0.1:${TUNNEL_ID}"   >> $BASH_ENV

workflows:
  version: 2
  Primary Branch Build and Deploy:
    jobs:
      - lpg-common-k8s/lpg-nextjs-primary-branch-build:
          name: Build
          context:
            - artifactory-only
          service-name: << pipeline.parameters.service-name >>
          brand-name: << pipeline.parameters.brand-name >>
          filters:
            branches:
              only: [main]
      - lpg-common-k8s/nextjs-deploy-dev-eu:
          name: Deploy DEV EU
          context:
            - Your-Team-CircleCi-Context-With-Encryption-Passcode
            - DEV-EUW2-Common
            - artifactory-only
          service-name: << pipeline.parameters.service-name >>
          namespace: << pipeline.parameters.brand-name >>
          requires: [Build]
      - lpg-common-k8s/nextjs-deploy-sit-eu:
          name: Deploy SIT EU
          context:
            - Your-Team-CircleCi-Context-With-Encryption-Passcode
            - DEV-EUW2-Common
            - artifactory-only
          service-name: << pipeline.parameters.service-name >>
          namespace: << pipeline.parameters.brand-name >>
          requires: [Deploy DEV EU]
      - cypress/run:
          command: CYPRESS_EXCLUDE_TAGS=smoke npx cypress run
          name: Cypress Run Tests - SIT
          context:
            - Your-Team-CircleCi-Context-With-Encryption-Passcode
            - artifactory-only
            - DEV-EUW2-Common
          executor: cypress-dev
          browser: chrome
          pre-steps:
            - lpg-common-k8s/lpg-environment
            - lpg-common-k8s/setup-npm-config
          post-checkout:
            - lpg-common-k8s/cypress-decrypt-env-file:
                env: sit
            - http-proxy
          config-file: cypress.dev.json
          store_artifacts: true
          no-workspace: true
          requires: [Deploy SIT EU]
      - lpg-common-k8s/lpg-container-promotion-dev-uat:
          name: Promote to UAT
          context:
            - artifactory-only
          service-name: << pipeline.parameters.service-name >>
          brand-name: << pipeline.parameters.brand-name >>
          requires: [Deploy SIT EU]
      - lpg-common-k8s/nextjs-deploy-ext-eu:
          name: Deploy EXT EU
          context:
            - Your-Team-CircleCi-Context-With-Encryption-Passcode
            - DEV-EUW2-Common
            - artifactory-only
          service-name: << pipeline.parameters.service-name >>
          namespace: << pipeline.parameters.brand-name >>
          requires: [Promote to UAT]
      - Approve PROD Deploy:
          type: approval
          requires: [Deploy EXT EU]
      - lpg-common-k8s/lpg-container-promotion-uat-prod:
          name: Promote to PROD
          context:
            - artifactory-only
          service-name: << pipeline.parameters.service-name >>
          brand-name: << pipeline.parameters.brand-name >>
          requires: [Approve PROD Deploy]
      - lpg-common-k8s/nextjs-deploy-prod-us:
          name: Deploy PROD US
          context:
            - Your-Team-CircleCi-Context-With-Encryption-Passcode-For-Prod
            - PROD-USE2-Common
            - artifactory-only
            - Slack
            - orb-publishing
          service-name: << pipeline.parameters.service-name >>
          namespace: << pipeline.parameters.brand-name >>
          requires: [Promote to PROD]
  Alt Branches Build and Deploy:
    jobs:
      - lpg-common-k8s/lpg-nextjs-alt-branch-build:
          name: Alt Branch Build
          context:
            - artifactory-only
          service-name: << pipeline.parameters.service-name >>
          brand-name: << pipeline.parameters.brand-name >>
          filters:
            branches:
              ignore: [main]
      - Approve DEV Deploy:
          type: approval
          requires: [Alt Branch Build]
      - lpg-common-k8s/nextjs-deploy-dev-eu:
          name: Deploy DEV EU
          context:
            - Your-Team-CircleCi-Context-With-Encryption-Passcode
            - DEV-EUW2-Common
            - artifactory-only
          service-name: << pipeline.parameters.service-name >>
          namespace: << pipeline.parameters.brand-name >>
          requires: [Approve DEV Deploy]
      - cypress/run:
          command: CYPRESS_EXCLUDE_TAGS=smoke npx cypress run
          name: Cypress Run Tests - DEV
          context:
            - Your-Team-CircleCi-Context-With-Encryption-Passcode
            - artifactory-only
            - DEV-EUW2-Common
          executor: cypress-dev
          browser: chrome
          pre-steps:
            - lpg-common-k8s/lpg-environment
            - lpg-common-k8s/setup-npm-config
          post-checkout:
            - lpg-common-k8s/cypress-decrypt-env-file:
                env: dev
            - http-proxy
          config-file: cypress.dev.json
          store_artifacts: true
          no-workspace: true
          requires: [Deploy DEV EU]
