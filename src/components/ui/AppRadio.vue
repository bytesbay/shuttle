<template>
	<label
		class="v-radio"
		:class="{isDisabled: disabled}"
		@click="changeValue"
	>
		<input type="radio" :name="groupName" :value="returnValue" />
		<div class="isCheck">
			<div class="checked" v-if="returnValue == value"></div>
		</div>
		<span>
			{{$ml.get(label)}}
		</span>
  	</label>
</template>

<script>
export default {
	props: {
		groupName: {
			required: true,
		},
		disabled: {
			required: false,
			default: false
		},
		clickDisabled: {
			required: false,
			default: false
		},
		label: {
			required: true
		},
		value: {
			required: true,
		},
		returnValue: {
			required: true,
		},
	},
	methods: {
		changeValue() {
			if (this.clickDisabled) 
				return 1;

			this.$emit('input', this.returnValue)
		}
	},
	watch: {
		// value: function (val) {
		// 	// console.log('kek');
		// 	this.$emit('input', this.returnValue)
		// }
	}
}
</script>

<style lang="scss" scoped>

.v-radio {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	cursor: pointer;

	input {
		display: none;
	}

	.isCheck {
		min-width: 22px;
		min-height: 22px;
		border: 1px solid #969696;
		box-sizing: border-box;
		border-radius: 50%;
		margin: 13px 14px;
		display: flex;
		align-items: center;
		justify-content: center;

		.checked {
			width: 14px;
			height: 14px;
			background: #7EAD4C;
			border-radius: 50%;
		}
	}
	span {
		font-family: Roboto;
		font-weight: bold;
		font-size: 14px;
		line-height: 21px;
		color: #666666;
	}
}

.isDisabled {
	opacity: .5;
}
</style>
