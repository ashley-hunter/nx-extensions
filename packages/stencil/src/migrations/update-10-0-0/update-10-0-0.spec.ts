import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { readJsonInTree, serializeJson } from '@nrwl/workspace';
import { createEmptyWorkspace } from '@nrwl/workspace/testing';
import * as path from 'path';

describe('update-1.1.0', () => {
  let tree: Tree;
  let schematicRunner: SchematicTestRunner;

  beforeEach(async () => {
    tree = createEmptyWorkspace(Tree.empty());

    schematicRunner = new SchematicTestRunner(
      '@nxext/stencil',
      path.join(__dirname, '../../../migrations.json')
    );

    tree.overwrite(
      'package.json',
      serializeJson({
        devDependencies: {
          '@stencil/core': '1.15.0',
        },
      })
    );
  });

  it(`should update dependencies`, async () => {
    const result = await schematicRunner
      .runSchematicAsync('update-10-0-0', {}, tree)
      .toPromise();

    const { devDependencies } = readJsonInTree(result, '/package.json');
    expect(devDependencies['@stencil/core']).toEqual('1.17.3');
  });
});
