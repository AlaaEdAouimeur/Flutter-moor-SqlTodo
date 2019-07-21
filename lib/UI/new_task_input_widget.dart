import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_material_color_picker/flutter_material_color_picker.dart';
import 'package:moo/Moor_Database/Moor_Database.dart';

class NewTaskInput extends StatefulWidget {
  const NewTaskInput({
    Key key,
  }) : super(key: key);

  @override
  _NewTaskInputState createState() => _NewTaskInputState();
}

class _NewTaskInputState extends State<NewTaskInput> {
 Color pickedColor = Colors.blueGrey;
  DateTime newTaskDate;
  TextEditingController controller;

  @override
  void initState() {
    super.initState();
    controller = TextEditingController();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(8.0),
      child: Row(
        mainAxisSize: MainAxisSize.max,
        children: <Widget>[
          _buildTextField(context),
          _buildColorPicker(context),
        ],
      ),
    );
  }

  Expanded _buildTextField(BuildContext context) {
    return Expanded(
      child: TextField(
        controller: controller,
        decoration: InputDecoration(hintText: 'Task Name'),
        onSubmitted: (inputName) {
          final database = Provider.of<AppDatabase>(context);
          final task = Task(
            name: inputName,
            color: pickedColor.value
          );
          database.insertTask(task);
          resetValuesAfterSubmit();
        },
      ),
    );
  }

  FlatButton _buildColorPicker(BuildContext context) {
    return    FlatButton(
            child: Icon(Icons.color_lens),
            onPressed: () {
              showDialog(
                  context: context,
                  builder: (BuildContext context) {
                    return SimpleDialog(
                      backgroundColor: Colors.blueGrey,
                      children: <Widget>[
                        MaterialColorPicker(
                          
                            allowShades: false, // default true
                            onMainColorChange: (ColorSwatch color) {
                             pickedColor = color;
                            Navigator.pop(context);
                            },
                            selectedColor: Colors.red),
                            
                       
                      ],
                    );
                  });
            },
          );
  }

  void resetValuesAfterSubmit() {
    setState(() {
      newTaskDate = null;
      controller.clear();
    });
  }
}