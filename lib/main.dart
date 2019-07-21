import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'Moor_Database/Moor_Database.dart';
import 'UI/Home.dart';
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Provider(
        builder: (_) => AppDatabase(),
          child: MaterialApp(
       
        title: 'Flutter Demo',
        theme: ThemeData(
          
          primarySwatch: Colors.blue,
        ),
        home: HomePage(),
      ),
    );
  }
}

