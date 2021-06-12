import React, {FC, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {Searchbar} from 'react-native-paper';

interface TProps {
  onChangeSearch?: (val: string) => void;
  onRefresh?: Function;
  searchValue?: string;
  headerView?: React.ReactNode;
  child?: React.ReactNode;
}
const {height, width} = Dimensions.get('screen');

export const BasePage: FC<TProps> = props => {
  const {onChangeSearch, searchValue, headerView, child, onRefresh} = props;
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshPage = () => {
    if (onRefresh) {
      setRefreshing(true);
      onRefresh().then(() => {
        setRefreshing(false);
      });
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        {headerView ? headerView : null}
        <Searchbar
          placeholder="search"
          onChangeText={value => (onChangeSearch ? onChangeSearch(value) : {})}
          value={searchValue ? searchValue : ''}
          iconColor="#A6F5BC"
          style={styles.searchContainer}
          inputStyle={styles.textSearch}
        />
      </SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefreshPage} />
        }>
        {child}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: 100,
    height: 210,
    borderWidth: 1,
    borderRadius: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  image: {height: 180, resizeMode: 'cover'},
  textSearch: {
    backgroundColor: '#BBC3BD',
    height: 30,
    fontSize: 12,
    padding: 2,
    marginHorizontal: 5,
    borderRadius: 15,
  },
  searchContainer: {
    backgroundColor: '#2C312D',
    height: 40,
    paddingVertical: 4,
    opacity: 1,
  },
});
