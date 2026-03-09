#!/usr/bin/env node
import { buildIconSet } from './animation-engine.mjs';
import { iconSetConfigs } from './icon-set-configs.mjs';

buildIconSet(iconSetConfigs.iconoir);
