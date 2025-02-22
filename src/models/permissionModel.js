import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  permissions: [
    {
      optionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Option', required: true },
      subOptions: [
        {
          subOptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubOption', required: true },
          actions: [{ type: String, enum: ['read', 'write', 'delete', 'update'] }]
        }
      ]
    }
  ]
});

export const Permission = mongoose.model('Permission', permissionSchema);


// import mongoose from 'mongoose';

// const permissionSchema = new mongoose.Schema({
//     roleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
//     optionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Option', required: false},
//     subOptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Option.subOptions', required: false},
//     actions: [{
//         type: String,
//         enum: ['read', 'write', 'delete', 'update'],
//         required: true
//     }]
// });

// export const Permission = mongoose.model('Permission', permissionSchema);