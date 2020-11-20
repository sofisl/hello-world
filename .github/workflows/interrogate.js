// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const {execSync} = require('child_process');
execSync('git fetch origin master');
const baseRef = process.env.GITHUB_BASE_REF;
console.log(`base ref: ${baseRef}`);
const status = execSync(`git diff --name-only origin/${baseRef}`, { encoding: 'utf-8'});
console.log(status);
const changes = status.split('\n');
let nodePaths = new Set();
let goPaths = new Set();
let bashPaths = new Set();
for (const change of changes) {
  if (change.startsWith('src/apis/')) {
      nodePaths.add(change.split('/')[2]);
  };
}
nodePaths = Array.from(nodePaths);
console.log(`::set-output name=nodePaths::${JSON.stringify(nodePaths)}`);
