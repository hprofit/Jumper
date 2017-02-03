export default class PhysicsService {
  constructor(){}
	collideGroups(game, groupA, groupB) {
		return game.physics.arcade.collide(groupA, groupB);
	}

	overlapEntityAndGroup(game, entity, group, callback, callbackContext) {
		let hits = 0;
		if (group.children) {
			group.children.forEach(function(groupEntity, index) {
				hits += game.physics.arcade.overlap(entity, groupEntity, callback, null, callbackContext) ? 1 : 0;
			});
		}
		return hits;
	}

	overlapArrayAndEntity(game, array, entity, onOverlapCallback, processCallback, callbackContext) {
		let hits = [];
		for (let arrayEntity of array) {
			if (game.physics.arcade.overlap(entity.sprite, arrayEntity.sprite, onOverlapCallback, processCallback, callbackContext)) {
        hits.push(arrayEntity);
      };
		};
		return hits;
	}

	collideArrayAndGroup(game, array, group) {
		let hitEntities = [];
		for (let entity of array) {
			if (this.collideGroups(game, entity.sprite, group)) {
				hitEntities.push(entity);
			}
		}
		return hitEntities;
	}

	collideArrayAndEntity(game, array, entity) {
		let hitEntities = [];
		for (let arrayEntity of array) {
			if (this.collideGroups(game, arrayEntity.sprite, entity.sprite)) {
				hitEntities.push(arrayEntity);
			}
		}
		return hitEntities;
	}
}
